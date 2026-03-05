# 🎙️ Smart Audio Reader - Audio Transcription

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_Whisper-412991?style=for-the-badge&logo=openai&logoColor=white)

**Smart Audio Reader** is a tiny web application built with Next.js that allows users to upload audio files, automatically detect the spoken language, and transcribe the audio into highly accurate text using OpenAI's Whisper API.

---

## ✨ Features

- **High Accuracy Transcription**: Powered by OpenAI's industry-leading `whisper-1` model.
- **Auto Language Detection**: Automatically recognizes the language of the uploaded audio.
- **RTL/LTR Support**: Automatically detects and aligns text direction (e.g., Right-To-Left for Persian/Arabic, Left-To-Right for English).
- **Modern UI/UX**: Beautiful, responsive, and mobile-friendly design using Tailwind CSS with glassmorphism effects.
- **Serverless Architecture**: Direct file streaming to OpenAI via Next.js App Router API without saving files to the local disk.

---

## 🛠️ Tech Stack

- **Frontend**: React, Next.js (App Router), Tailwind CSS
- **Backend**: Next.js Route Handlers (`app/api`)
- **AI Service**: OpenAI Node.js SDK
- **Language**: JavaScript (ES6+)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (Version 18.17.0 or higher recommended)
- An active [OpenAI API Key](https://platform.openai.com/api-keys) with available credits.

### Installation

1. **Clone the repository** (or create the Next.js app manually):
   ```bash
   git clone https://github.com/afshintalebi/smart-audio-reader.git
   cd smart-audio-reader
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Environment Variables**:
   ```env
   OPENAI_API_KEY=sk-your-openai-api-key-here
   ```
   Create a `.env.local` file in the root directory and add your key:

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open the App**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Usage
   1. Click on the dashed upload area to select an audio file from your device.
   2. Supported formats include: `mp3`, `mp4`, `mpeg`, `mpga`, `m4a`, `wav`, and `webm`.
   3. Ensure the file size is **under 25MB**.
   4. Click the **"Transcribe Audio"** button.
   5. Wait a few seconds for the AI to process the file. The detected language and the transcribed text will appear elegantly on the screen.

---

## 🗂️ Project Structure
   ```text
   smart-audio-reader/
   ├── app/
   │   ├── api/
   │   │   └── transcribe/
   │   │       └── route.js     # Backend API endpoint to handle OpenAI requests
   │   ├── globals.css          # Global styles & Tailwind directives
   │   ├── layout.js            # Root layout for Next.js
   │   └── page.js              # Main frontend UI component
   ├── public/                  # Static assets
   ├── .env.local               # Environment variables (Ignored by Git)
   ├── next.config.mjs          # Next.js configuration file
   ├── package.json             # Project metadata and dependencies
   ├── tailwind.config.js       # Tailwind CSS configuration
   └── README.md                # Project documentation
   ```

---

## ⚠️ Important Notes & Limitations

- **File Size Limit**: The OpenAI Whisper API currently accepts files up to 25MB. If you need to process larger files, you will need to implement an audio splitting logic in the backend.
- **API Costs**: Whisper API is incredibly cheap but not free (approximately $0.006 per minute of audio). Keep an eye on your OpenAI platform usage dashboard.

---

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
Feel free to use, modify, and distribute this project as you see fit!
