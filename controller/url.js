const shortid = require('shortid'); 
const URL = require('../models/url');

async function generatenewurl(req, res) {
    const body = req.body;

    if (!body.RedirectURL) {
        return res.status(400).json({ message: 'Bad request' });
    }

   
    const ShortID = shortid.generate(); 
    await URL.create({
        ShortId: ShortID, 
        RedirectURL: body.RedirectURL,
        VisitHistory: [],
    });

    return res.status(200).json({ id: ShortID }); // Return the correct ShortID
}
async function UpdateHistory(req, res) {
    const ShortID = req.params.shortID;

    try {
        // Find the URL entry, update visit history, and return the updated entry
        const entry = await URL.findOneAndUpdate(
            { ShortId: ShortID },
            {
                $push: {
                    VisitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true } // Return the updated document
        );

        // If no entry found, send a 404 error
        if (!entry) {
            return res.status(404).json({ message: 'URL not found' });
        }

        console.log("Entry found:", entry);

        // Redirect to the original URL
        return res.redirect(entry.RedirectURL);  // Make sure this is the last action
    } catch (err) {
        // Handle any errors
        return res.status(500).json({ message: err.message });
    }
}
async function handleAnalutics(req,res){

    const shortid=req.params.shortid;
    try{
        const URl=await URL.findOne({ShortId:shortid},{'VisitHistory.timestamp':1,_id:1});
        if(!URl){
            return res.status(404).json({message:"Id not found"})
        }
        console.log("Stats check:",URl)
        return res.status(200).json({totalClicks:URl.VisitHistory.length,anlytics:URl.VisitHistory})
    }
    catch(e){
        return res.status(500).json({'error':e});
    }

}



module.exports = {
    generatenewurl,
    UpdateHistory,
    handleAnalutics
};
