# Team 12 CSC 4320

Multi-threaded web crawler.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) (which includes `npm`).
- You have installed [Python](https://www.python.org/).

## Getting Started

Follow these steps to get your local development environment up and running:

### Clone the repository

```bash
git clone https://github.com/marendale/team-12-csc-4320.git
cd team-12-csc-4320
```

### Set up the backend

1. Open a terminal at the repository root.
2. Navigate to the `backend` directory:

```bash
cd backend
```

3. Install the required Python packages:

```bash
pip install requests beautifulsoup4 Flask Flask-SQLAlchemy flask-cors
```

4. Start the Flask backend server:

```bash
python main.py
```

The Flask server should now be running and accessible.

### Set up the frontend

1. Open another terminal at the repository root.
2. Navigate to the `frontend` directory:

```bash
cd frontend
```

3. Install the necessary Node.js packages:

```bash
npm install
```

4. Start the development server with Vite:

```bash
npm run dev
```

The React application should now be running and accessible via `http://localhost:3000` (or another port if 3000 is busy).

## Usage

Enter a url into the input form and click the `start crawl` button. You should then see the crawler begin to populate the table. If you want to stop, click the `pause crawl` button. You will then be given the option to `resume crawl` or `end crawl`, end crawl will discard all information, resume crawl will continue populating the table from where it was stopped.


## License

Distribute under the MIT license. See `LICENSE` for more information.

## Project

Project Link: [https://github.com/your_username/your_project](https://github.com/your_username/your_project)
