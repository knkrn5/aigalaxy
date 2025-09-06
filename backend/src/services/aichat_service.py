from openai import OpenAI
import os
import asyncio


client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API"),
)


class aichatservice:
    @staticmethod
    def aichatManu(question: str, model: str):
        if not question:
            raise ValueError("Question cannot be empty")

        completion = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": question}],
            temperature=0.6,
            top_p=0.95,
            max_tokens=4096,
            frequency_penalty=0,
            presence_penalty=0,
            stream=True,
        )

        for chunk in completion:
            # print(chunk, end="\n\n")
            if chunk.choices[0].delta.content is not None:
                print(chunk.choices[0].delta.content)
                yield f"data: {chunk.choices[0].delta.content}/n"

    @staticmethod
    def aichatAuto(question: str, model: str):
        if not question:
            raise ValueError("Question cannot be empty")

        completion = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": question}],
            temperature=0.6,
            top_p=0.95,
            max_tokens=4096,
            frequency_penalty=0,
            presence_penalty=0,
            stream=True,
        )

        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                print(chunk.choices[0].delta.content, end="")
                yield f"data: {chunk.choices[0].delta.content}\n\n"

        yield "data: [DONE]\n\n"

    @staticmethod
    def aichatDirect(question: str, model: str):
        if not question:
            raise ValueError("Question cannot be empty")

        completion = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": question}],
            temperature=0.6,
            top_p=0.95,
            max_tokens=4096,
            frequency_penalty=0,
            presence_penalty=0,
            stream=False,
        )

        print(completion.choices[0].message.content)
        return completion.choices[0].message.content
