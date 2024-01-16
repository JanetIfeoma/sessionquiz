
from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.static_folder = 'static'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz.db'
db = SQLAlchemy(app)

general_knowledge_questions = [
    {"id": 1, "question_text": "What is the capital of France?", "options": ["Paris", "Berlin", "London"]},
    {"id": 2, "question_text": "Which planet is known as the Red Planet?", "options": ["Mars", "Venus", "Jupiter"]},
    # Add more general knowledge questions
]

class QuizQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_number = db.Column(db.Integer)
    question_text = db.Column(db.String(255))
    options = db.Column(db.String(255))
    correct_option = db.Column(db.String(50))

@app.route('/')
def index():
    with app.app_context():
        return render_template('index.html')

@app.route('/get_quiz_questions/<int:session_number>', methods=['GET'])
def get_quiz_questions(session_number):
    with app.app_context():
        questions = QuizQuestion.query.filter_by(session_number=session_number).all()
        quiz_questions = [{
            'id': question.id,
            'question_text': question.question_text,
            'options': question.options.split(','),
        } for question in questions]
        return jsonify({'questions': quiz_questions})


@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    with app.app_context():
        data = request.get_json()
        user_answers = data.get('answers')
        session_number = data.get('session_number')
        # Implement scoring logic based on correct answers
        # Update user session progress and store scores in the database
        # ...

        return jsonify({'message': 'Quiz submitted successfully'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
































