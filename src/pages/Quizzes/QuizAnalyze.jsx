import React from 'react'
import { useSelector } from 'react-redux'
import { chatSession } from './AiModelAnalyze';

const QuizAnalyze = () => {
    const { questionAnswers } = useSelector((state) => state.quizzes);
    const Prompt = `
                   You are given a list of student responses to a quiz. Each response contains a question and an answer. Your task is to evaluate whether the answer is correct, incomplete, or vague. For each response, please return the following:
                    Evaluation: Indicate if the answer is "correct", "incomplete", or "incorrect".
                    Recommendations: Provide specific suggestions on how the student can improve their answer. Focus on:
                    Clarifying or expanding on any vague or incomplete responses.
                    Correcting any inaccuracies.
                    Adding missing key information or concepts.
                    Additional Resources: Suggest resources (e.g., websites, books, articles) or topics for further learning if the answer is incorrect or lacking.
                    Ensure your response is focused on helping the student improve and better understand the topic.
                    Student Responses :${JSON.stringify(questionAnswers, null, 2)}
            `;

    const Aianalyze = async() => {
        const AiAnalyzeResponse = await chatSession.sendMessage(Prompt);
        console.log(AiAnalyzeResponse?.response?.text());
    };
    Aianalyze();
  return (
    <div>QuizAnalyze</div>
  )
}

export default QuizAnalyze