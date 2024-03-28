from config import db

class Website(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(400), unique=True, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
   

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name, 
            "url": self.url,
        }
