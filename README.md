# QuestCraft - Question Paper Generator

QuestCraft is a cutting-edge Question Paper Generator designed to streamline the process of creating customized question papers. This project leverages a modern technology stack, featuring React for the frontend, Node.js and Express.js for the backend, and MongoDB for data storage.

## Features

### 1. Dynamic Question Generation

QuestCraft utilizes a dynamic question generation algorithm employing Dynamic Programming (DP) to intelligently select questions based on specified criteria. The algorithm ensures the generated question paper adheres to the defined distribution of difficulty levels and total marks.

### 2. User-Friendly Interface

Built with React, the user interface provides an intuitive and user-friendly experience. Users can effortlessly input details such as total marks, percentages of easy, medium, and hard questions, and the system dynamically generates a question paper accordingly.

### 3. Scalability and Extensibility

The project is structured to be highly scalable and extensible. The separation of the frontend and backend components allows for easy integration with additional features or future enhancements. The use of Node.js and Express.js ensures scalability to handle increased loads.

### 4. Data Persistence with MongoDB

QuestCraft stores questions and relevant information in a MongoDB database, providing efficient data storage and retrieval. This choice allows for easy scalability as the question bank grows.

### 5. Unique Algorithm for Question Sequencing

The algorithm not only selects questions but also optimizes the sequencing of questions to meet the specified total marks for each difficulty level. It ensures that the generated sequence satisfies the given constraints, offering a unique approach to question paper generation.

### 6. Clear and Informative Output

Upon generating a question paper, QuestCraft provides a clear and informative output, detailing the total marks, difficulty distribution, and a list of questions with their corresponding marks. This output is presented in a modal for a better user experience.

## How It Works

1. **Input Parameters**: Users provide input such as total marks and the percentage distribution of easy, medium, and hard questions through the user interface.

2. **Dynamic Question Generation**: The backend algorithm dynamically selects questions based on the provided input and generates a question paper adhering to the specified criteria.

3. **Sequencing with DP**: The unique algorithm uses Dynamic Programming to optimize the sequencing of questions, ensuring that the generated paper meets the required difficulty distribution and total marks.

4. **Display Output**: The frontend displays the generated question paper in a modal, presenting a clear and organized view of the selected questions with their respective marks.

## Technologies Used

- **React**: Frontend development for a responsive and interactive user interface.
- **Node.js**: Backend development for server-side logic and handling requests.
- **Express.js**: Web application framework for building robust and scalable APIs.
- **MongoDB**: NoSQL database for efficient and flexible data storage.


### Prerequisites

Make sure you have the following installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node Package Manager): It comes bundled with Node.js.

### Installation

1. Clone the repository and move to the folder reelo_assignment:

```bash
git clone https://github.com/niladri2002/reelo_assignment.git
cd reelo_assignment
```

2. Move to the frontend repository , then npm install and then npm start to start the frontend on localhost:3000:

```bash
cd rfrontend
npm install
npm start
```

3. Move to the server repository ,then npm install and then nodemon server to start the backend server on localhost:5000 and mongodb on localhost:27017:

```bash
cd server
npm install
nodemon server
```

## Details about the Algorithm of Question Generation

The magical function, generateQuestionPaper, brings to life the essence of crafting diverse and challenging exams.

### Introduction: The Blueprint for Your Exam Odyssey
In the enchanted realm of QuestCraft, you are the architect of knowledge. Begin your journey by specifying the total marks and the distribution of difficulty levels, setting the stage for a unique exam experience.

```json
const totalMarks = 100;
const difficultyDistribution = { Easy: 20, Medium: 50, Hard: 30 };
const questionPaper = await generateQuestionPaper(totalMarks, difficultyDistribution);
```

### Shuffle Spells: Adding a Dash of Randomness
To ensure the magic of unpredictability, QuestCraft employs a spellbinding shuffle. Questions within each difficulty level are shuffled, guaranteeing that each paper is a distinct blend of challenges.

```json
const shuffledQuestions = shuffleArray([...questions]);
```

### Dynamic Programming Sorcery: Unraveling the Sequencing Magic
Enter the wizardry of dynamic programming! This is where the algorithm strategically selects sequences of questions to match the desired difficulty marks, ensuring a balanced and challenging paper.

```json
const dp = Array(marksForDifficulty + 1).fill(false);
dp[0] = true;

for (const question of shuffledQuestions) {
  for (let i = marksForDifficulty; i >= question.marks; i--) {
    if (dp[i - question.marks]) {
      dp[i] = true;
    }
  }
}
```

### Paper Puzzles: Crafting the Perfect Tapestry
When the stars align, and a sequence is revealed, QuestCraft carefully curates the questions. Each question contributes to the symphony of knowledge, ensuring that the selected questions align perfectly with the specified difficulty marks.

```json
if (dp[marksForDifficulty]) {
  const selectedQuestions = [];
  let remainingMarks = marksForDifficulty;

  for (const question of shuffledQuestions) {
    if (question.marks <= remainingMarks && dp[remainingMarks - question.marks]) {
      selectedQuestions.push(question);
      remainingMarks -= question.marks;
    }

    if (remainingMarks === 0) {
      break;
    }
  }

  questionPaper.sections.push({
    difficulty,
    marks: marksForDifficulty,
    questions: [...selectedQuestions],
  });
}
```

### Graceful Enchantments: Handling the Unseen Challenges
Yet, not every enchantment unfolds flawlessly. If the magic encounters challenges and a sequence eludes its grasp, QuestCraft gracefully handles the situation. It introduces a set of default questions, ensuring that the exam enchantment remains unbroken.

```json
// If magic falters and a sequence is not found
if (!dp[marksForDifficulty]) {
  questionPaper.sections.push({
    difficulty,
    marks: marksForDifficulty,
    questions: await getDefaultQuestions(difficulty), // Implement getDefaultQuestions function
  });
}
```

# APIs

## Backend APIs

### 1. Generate Question Paper

- **Endpoint**: `/generate-paper`
- **Method**: `POST`
- **Description**: Generates a question paper based on user input.
- **Request Payload**:
  - `totalMarks`: Total marks for the question paper.
  - `difficultyDistribution`: Object containing percentages for Easy, Medium, and Hard questions.
  - **Example**:
    ```json
    {
      "totalMarks": 100,
      "difficultyDistribution": {
        "Easy": 20,
        "Medium": 50,
        "Hard": 30
      }
    }
    ```
  - **Response**:
    - A JSON object containing the generated question paper details.

### 2. Get All Questions

- **Endpoint**: `/questions`
- **Method**: `GET`
- **Description**: Retrieves all questions from the database.
- **Response**:
  - An array of question objects.

### 3. Add New Question

- **Endpoint**: `/questions/add`
- **Method**: `POST`
- **Description**: Adds a new question to the database.
- **Request Payload**:
  - `question`: Text of the question.
  - `subject`: Subject of the question.
  - `topic`: Topic of the question.
  - `difficulty`: Difficulty level of the question.
  - `marks`: Marks assigned to the question.
  - **Example**:
    ```json
    {
      "question": "What is the capital of France?",
      "subject": "Geography",
      "topic": "Countries",
      "difficulty": "Medium",
      "marks": 5
    }
    ```
  - **Response**:
    - A JSON object confirming the addition of the question.

## Frontend APIs

### 1. Retrieve Generated Question Paper

- **Method**: `GET`
- **Description**: Retrieves the generated question paper details.
- **Example**:
  ```javascript
  const response = await axios.get('/generate-paper');
  console.log(response.data);




## Why QuestCraft is Unique

QuestCraft stands out due to its intelligent question generation algorithm, which not only selects questions but also optimizes their sequencing to fulfill specific constraints. The combination of React, Node.js, Express.js, and MongoDB ensures a scalable, user-friendly, and extensible solution for generating tailored question papers. The project's unique approach to dynamic sequencing sets it apart, making QuestCraft a valuable tool for educators and institutions.
