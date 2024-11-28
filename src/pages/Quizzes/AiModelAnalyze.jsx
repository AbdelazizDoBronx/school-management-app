

// -install ai depancies
// -build chatsession


import {GoogleGenerativeAI} from '@google/generative-ai'
  
  const apiKey = 'AIzaSyCfm2PQYxzsvPMpgLtbpZri1NmCV5fvtQk';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "You are given a list of student responses to a quiz in a state-based object format. Each response contains a question and an answer. Your task is to evaluate whether the answer is correct, incomplete, or vague. For each response, please provide specific recommendations for how the answer can be improved. Consider the accuracy of the response, suggest additional details, and indicate if any key elements are missing."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Please provide the list of student responses in the state-based object format.  I need the data to be able to evaluate the answers and provide feedback.  For example, your data might look like this (adjust as needed to match your actual data structure):\n\n```json\n[\n  {\n    \"student_id\": 1,\n    \"question\": \"What are the three branches of government in the US?\",\n    \"answer\": \"Executive, Legislative, Judicial.\"\n  },\n  {\n    \"student_id\": 2,\n    \"question\": \"Explain the process of photosynthesis.\",\n    \"answer\": \"Plants use sunlight to make food.\"\n  },\n  {\n    \"student_id\": 3,\n    \"question\": \"Describe the causes of the American Civil War.\",\n    \"answer\": \"Slavery and states' rights were involved, I think.\"\n  }\n]\n```\n\nOnce you provide the data, I will analyze each response and give you feedback including:\n\n* **Evaluation:** Correct, Incomplete, or Vague.\n* **Recommendations for Improvement:** Specific suggestions to make the answer more accurate and complete, including missing key elements and additional details.\n\n\nI look forward to helping you evaluate the student responses!\n"},
          ],
        },
      ],
    });
  
