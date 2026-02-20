🏥 MediScribe – LLM-Based Clinical Text Generation
Generative AI for Healthcare Documentation
📌 Overview

MediScribe is a transformer-based Generative AI system designed to automate clinical documentation.
The system converts structured patient findings — such as symptoms, diagnosis, and prescribed treatment — into coherent, professionally formatted medical reports using Large Language Models (LLMs).

This project explores the application of generative language models in healthcare and evaluates their performance using standard NLP metrics.

❗ Problem Statement

Clinical documentation is a time-intensive and repetitive task in healthcare environments.
Doctors and healthcare professionals spend significant time writing structured medical reports, which may lead to inconsistencies and increased workload.

There is a need for an intelligent system capable of generating structured, readable, and contextually accurate clinical reports from medical findings using Generative AI techniques.

🎯 Objectives

Develop an LLM-based system for automated clinical text generation

Convert structured patient findings into complete medical reports

Compare different transformer models for generation quality

Evaluate generated reports using BLEU and ROUGE metrics

Analyze coherence, fluency, and factual consistency

Study limitations such as hallucination and prompt sensitivity

🧠 Key Features

✔ Transformer-based clinical text generation

✔ Structured input to formatted report conversion

✔ Multi-model evaluation (GPT-2 / FLAN-T5)

✔ Prompt engineering experimentation

✔ Quantitative evaluation metrics

✔ Simple demo interface (Streamlit UI)

🏗️ Tech Stack
🔹 Languages & Frameworks

Python

PyTorch

Hugging Face Transformers

NLTK

🔹 Models Used

GPT-2 – Autoregressive text generation

FLAN-T5 – Instruction-tuned generation

T5 – Sequence-to-sequence transformer

🔹 Tools

Streamlit (UI demonstration)

Matplotlib (result visualization)

Scikit-learn (evaluation utilities)

⚙️ Pipeline
🔄 Workflow
1️⃣ Input

Symptoms

Diagnosis

Medication

Observations

2️⃣ Processing

Structured formatting

Prompt construction

3️⃣ LLM Inference

Tokenization

Transformer-based generation

Controlled decoding (temperature, max_length)

4️⃣ Output

Structured clinical report

5️⃣ Evaluation

BLEU Score

ROUGE Score

Semantic similarity

📊 Results

✅ Generated reports are coherent and medically formatted

✅ FLAN-T5 produces more structured outputs compared to GPT-2

⚠ Occasional hallucinated medical details

⚠ Sensitivity to prompt structure

⚠ Performance depends on decoding parameters
