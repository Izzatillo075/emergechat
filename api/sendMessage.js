/**
 * Handles POST requests sent to this function.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - A response object indicating success or failure.
 */
export async function POST(request) {
    try {
        // Extract the data sent in the request body (assuming JSON format)
        const { message, password } = await request.json();

        // Retrieve the correct password and bot token from environment variables
        const correctPassword = process.env.SITE_PASSWORD;
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        console.log('PASSWORD'. correctPassword)

        // Validate the password
        if (password !== correctPassword) {
            return new Response('Unauthorized', { status: 401 });
        }

        // Construct the Telegram API URL with the message
        const chatId = '-1002147905876';  // Replace with your chat ID
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        // Use fetch to send the request
        const response = await fetch(url, { method: "GET" });

        // Check the response status
        if (response.ok) {
            console.log(await response.text());
            return new Response('Sent successfully', { status: 200 });
        } else {
            console.error(`Error: ${response.statusText}`);
            return new Response('Error on send', { status: response.status });
        }
    } catch (error) {
        console.error('Error:', error);
        return new Response('Error processing the request', { status: 500 });
    }
}


export function GET(request) {
    console.log(request)

    return new Response('Working')
}