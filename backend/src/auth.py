import jwt
import os

secret_key = os.environ.get('JWT_SECRET')
options = {
    'verify_signature': True,
    'verify_exp': True,
    'verify_nbf': False,
    'verify_iat': True,
    'verify_aud': False
}

def has_auth(request):
    auth = request.headers.get('Authorization')
    if auth is None:
        print("Not authorized!")
        return False
    parts = auth.split()
    token = parts[1]
    try:
        jwt.decode(token, secret_key, options=options)
    except Exception as e:
        print("Not authorized:")
        print(str(e))
        return False
    print("Authorization granted.")
    return True

def login_required(handler_class):
    ''' Handle Tornado JWT Auth '''
    def wrap_execute(handler_execute):
        def require_auth(handler, kwargs):

            auth = handler.request.headers.get('Authorization')
            if auth:
                parts = auth.split()

                if parts[0].lower() != 'bearer':
                    handler._transforms = []
                    handler.set_status(401)
                    handler.write("invalid header authorization")
                    handler.finish()
                elif len(parts) == 1:
                    handler._transforms = []
                    handler.set_status(401)
                    handler.write("invalid header authorization")
                    handler.finish()
                elif len(parts) > 2:
                    handler._transforms = []
                    handler.set_status(401)
                    handler.write("invalid header authorization")
                    handler.finish()

                token = parts[1]
                try:
                    jwt.decode(token, secret_key, options=options)
                except KeyError as e:
                    handler._transforms = []
                    handler.set_status(401)
                    handler.write(str(e))
                    handler.finish()
            else:
                handler._transforms = []
                handler.write("Missing authorization")
                handler.finish()

            return True

        def _execute(self, transforms, *args, **kwargs):

            try:
                require_auth(self, kwargs)
            except Exception:
                return False

            return handler_execute(self, transforms, *args, **kwargs)

        return _execute

    handler_class._execute = wrap_execute(handler_class._execute)
    return handler_class