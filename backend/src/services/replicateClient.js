import Replicate from "replicate";

let replicate = null;

function ensureReplicateConfigured() {
  if (!replicate) {
    if (!process.env.REPLICATE_API_TOKEN || process.env.REPLICATE_API_TOKEN === 'your_replicate_api_token_here') {
      throw new Error('REPLICATE_API_TOKEN is not set or is using placeholder value');
    }
    
    replicate = new Replicate({ 
      auth: process.env.REPLICATE_API_TOKEN 
    });
    
    console.log('Replicate client configured with token:', 
      process.env.REPLICATE_API_TOKEN ? '***SET***' : 'MISSING'
    );
  }
}

export async function runTryOn(personUrl, clothingUrl) {
  ensureReplicateConfigured();
  
  try {
    const input = {
      prompt: "Try on the clothing item on the person. Make the result look natural and realistic.",
      image_input: [personUrl, clothingUrl],
      output_format: "jpg"
    };

    const output = await replicate.run("google/nano-banana", { input });
    return output;
  } catch (error) {
    console.error("Error in runTryOn:", error);
    throw new Error("Failed to process try-on request");
  }
}

export async function runClothingSwap(person1Url, person2Url) {
  ensureReplicateConfigured();
  
  try {
    const input = {
      prompt: "Create a clothing swapped image. Take the clothing of the person from the first photo and let the person from the second image wear it. Generate a realistic, full-body shot of the person wearing the clothes.",
      image_input: [person1Url, person2Url],
      output_format: "jpg"
    };

    const output = await replicate.run("google/nano-banana", { input });
    return output;
  } catch (error) {
    console.error("Error in runClothingSwap:", error);
    throw new Error("Failed to process clothing swap request");
  }
}