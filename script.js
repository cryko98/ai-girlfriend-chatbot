async function generateReply() {
    const userInput = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');

    if (userInput.trim() === "") {
        responseDiv.innerHTML = "Please say something to me 💬";
        return;
    }

    responseDiv.innerHTML = "Typing... 💬";

    const API_URL = "https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/completions"; 
    const API_TOKEN = "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";

    const headers = {
        "Authorization": `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
    };

    const prompt = `You are a sweet, supportive and caring girlfriend chatting with your boyfriend. Answer warmly, flirt a little, be affectionate and cute. His message: "${userInput}"`;

    const payload = {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.9,
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log(data);
        responseDiv.innerHTML = data.choices[0]?.text || "Sorry love, I didn't understand 💔.";
    } catch (error) {
        responseDiv.innerHTML = "I can't reach you right now 💔.";
    }
}
