from flask import jsonify, request, current_app as app
from flask_bcrypt import check_password_hash, generate_password_hash
from functools import wraps
from services import *
from jwtUtil import *
from utils import *

# return claims for manager_required and staff_required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # jwt is passed in the request header
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'][7:] # remove 'Bearer '

        if not token:
            return jsonify({MESSAGE : NO_ACCESS_TOKEN}), UNAUTHORIZED

        try:
            # try decode
            claims = jwtDecode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            
        except jwt.ExpiredSignatureError:
            return jsonify({MESSAGE : TOKEN_EXPIRED}), UNAUTHORIZED
        except jwt.JWTClaimsError:
            return jsonify({MESSAGE : TOKEN_CLAIMS_ERROR}), UNAUTHORIZED
        except:
            return jsonify({MESSAGE : INVALID_ACCESS_TOKEN}), UNAUTHORIZED
        return f(claims, *args, **kwargs)
  
    return decorated


# returns id from claims
def manager_required(f):
    @wraps(f)
    def decorated(claims, *args, **kwargs):
        if claims[ROLE] == MANAGER:
            return f(claims[USERNAME], *args, **kwargs)
        else:
            return jsonify({MESSAGE : NO_PERMISSION}), UNAUTHORIZED

    return decorated


# returns id from claims
def staff_required(f):
    @wraps(f)
    def decorated(claims, *args, **kwargs):
        if claims[ROLE] == STAFF:
            return f(claims[USERNAME], *args, **kwargs)
        else:
            return jsonify({MESSAGE : NO_PERMISSION}), UNAUTHORIZED

    return decorated


def authenticate(pwd_hash, password):
    return check_password_hash(pwd_hash, password) # returns True
        
def generatePWDHash(password):
    return generate_password_hash(password) # return bcrypt hash