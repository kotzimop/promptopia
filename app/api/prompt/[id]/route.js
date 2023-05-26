import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (req, {params}) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    
    if(!prompt) return new Response(JSON.stringify("Prompt not found"), { status: 404})
    
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    
    return new Response(JSON.stringify("Unable to fecth all data"), {
      status: 500,
    });

  }
};

// PATCH (update)
export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json()

    try {
        await connectToDB()
        // Find requested prompt
        const existingPrompt = await Prompt.findById(params.id);    
        // Check if prompt exists
        if(!existingPrompt) return new Response(JSON.stringify("Prompt not found"), { status: 404 });

        // Update prompt and tag
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        // Return the updated prompt
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {

        return new Response(JSON.stringify("Unable to update the prompt"), {status: 500})
        
    }
}

// DELETE (delete)
export const DELETE = async (req, {params}) => {
    try {
        await connectToDB()
        // Find requested prompt
        const existingPrompt = await Prompt.findByIdAndRemove(params.id);    
        // Check if prompt exists
        if(!existingPrompt) return new Response(JSON.stringify("Prompt not found"), { status: 404 });
        return new Response(JSON.stringify("Prompt deleted successfully"), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("Unable to delete the prompt"), {status: 500});
    
    }
}

