from openai import OpenAI
import os
from sse_starlette import EventSourceResponseapp


client = OpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.getenv("NVIDIA_API"),
)


class aichatservice:
    @staticmethod
    def aichat():
        completion = client.chat.completions.create(
            model="nvidia/llama-3.3-nemotron-super-49b-v1",
            messages=[{"role": "user", "content": "does god exists?"}],
            temperature=0.6,
            top_p=0.95,
            max_tokens=4096,
            frequency_penalty=0,
            presence_penalty=0,
            stream=True,
        )

        for chunk in completion:
            if chunk.choices[0].delta.content is not None:
                # print(chunk.choices[0].delta.content, end="")
                return chunk.choices[0].delta.content
