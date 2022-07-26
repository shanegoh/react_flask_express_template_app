from flask import Flask
import logging


def create_app():
    """Create Flask application."""
    app = Flask(__name__)
    from flask_cors import CORS
    from database import db
    CORS(app)
    app.config['SECRET_KEY'] = 'iCuytwshTX'
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:8!2MatsWeT14NtL%wiPb@dbshack.comzufct38hz.ap-southeast-1.rds.amazonaws.com/test_production'
    # app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/test_production'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    logging.basicConfig(level=logging.INFO)
    with app.app_context():
        # Import parts of our application
        from routes.routes import routes_bp
        from routes.manager_routes import manager_routes_bp
        from routes.staff_routes import staff_routes_bp
        # Register Blueprints
        app.register_blueprint(manager_routes_bp, url_prefix='/api/manager')
        app.register_blueprint(staff_routes_bp, url_prefix='/api/staff')
        app.register_blueprint(routes_bp, url_prefix='/api')
        return app
