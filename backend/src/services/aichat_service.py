from openai import OpenAI
import os
import asyncio


client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API"),
)


class aichatservice:
    @staticmethod
    def aichat(question: str):
        if not question:
            raise ValueError("Question cannot be empty")

        completion = client.chat.completions.create(
            model="nvidia/llama-3.3-nemotron-super-49b-v1",
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
                yield f"data: {chunk.choices[0].delta.content}\n"
                # yield {chunk.choices[0].delta.content}
                # await asyncio.sleep(0.01)

        # yield "data: [DONE]\n\n"
