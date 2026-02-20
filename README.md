🏥 MediScribe – LLM-Based Clinical Text Generation
🤖 AI-Powered Clinical Report Generation

Python PyTorch Transformers NLP Healthcare AI Research Project

📌 Overview

MediScribe is a transformer-based Generative AI system designed to automate clinical documentation.
It converts structured patient findings into coherent, professionally formatted medical reports using Large Language Models (LLMs).

The project focuses on improving healthcare documentation efficiency while evaluating linguistic quality and contextual accuracy.

❗ Problem Statement

Clinical documentation is time-consuming and repetitive.
Healthcare professionals spend significant time drafting structured medical reports, increasing workload and inconsistencies.

There is a need for an intelligent generative system capable of producing structured, readable, and context-aware clinical reports from medical findings.

🎯 Objectives

Develop an LLM-based clinical report generation system

Convert structured findings into formatted medical reports

Compare transformer models for generation quality

Evaluate outputs using BLEU and ROUGE metrics

Analyze hallucination and prompt sensitivity

🎯 Use Case

🩺 Assist doctors in drafting reports

📋 Automate routine clinical documentation

🏥 Support hospital record systems

🎓 Medical education simulations

⚡ Reduce documentation workload

🧠 Key Features

Transformer-based clinical text generation

Structured-to-report conversion pipeline

Multi-model comparison (GPT-2 / FLAN-T5)

Prompt-controlled generation

Quantitative evaluation metrics

Optional Streamlit demo interface

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

Matplotlib (visualization)

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

✅ Coherent and medically formatted reports generated

✅ FLAN-T5 produces more structured outputs than GPT-2

⚠ Occasional hallucinated medical details

⚠ Output varies with decoding parameters
