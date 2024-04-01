
const projects = require('../Models/projectSchema');



//add project
exports.addproject = async (req, res) => {
    console.log(" inside addprojectControll");
    const userId = req.payload;
    console.log(userId);
    const projectImage = req.file.filename;
    console.log(projectImage);
    const { title, language, github, Website, Overview } = req.body;
    try {
        const existingProject = await projects.findOne({ github: github });
        if (existingProject) {
            res.status(406).json('project already exist ,upload a new one')
        }
        else {
            const newProject = new projects({
                title: title,
                language: language,
                github: github,
                Website: Website,
                Overview: Overview,
                projectImage: projectImage,
                userId: userId
            })
            await newProject.save();
            res.status(200).json("project added successfully")
        }

    } catch (err) {
        res.status(401).json("unable to add project due to:", err)
    }
}
exports.getHomeProject = async (req, res) => {
    try {
        const homeproject = await projects.find().limit(3);
        res.status(200).json(homeproject)
    } catch (err) {
        res.status(401).json("request failed due to", err)


    }
}


exports.getAllproject = async (req, res) => {
    //getting value frome Query parameter
    //syntax:req.Query.Keyname
    const searchKey = req.query.search;
    console.log(searchKey);
    const Query = {
        language: {
            //regular expression
            //i= to remove case sensitivity
            $regex: searchKey, $options: "i"
        }
    }
    try {
        const allproject = await projects.find(Query);
        res.status(200).json(allproject)

    } catch (err) {
        res.status(401).json("request failed due to ", err)
    }
}


exports.getuserproject = async (req, res) => {
    const userId = req.payload
    try {
        const userproject = await projects.find({ userId: userId });
        res.status(200).json(userproject)

    } catch (err) {
        res.status(401).json("request failed due to ", err)
    }
}

exports.editUserProject = async(req,res)=>{

const {id} = req.params;
const userId = req.payload;
 console.log("project id",id);
 console.log("user id",userId);
    const { title, language, github, Website, Overview, projectImage } = req.body;
    const uploadProjectImage = req.file ? req.file.filename : projectImage;
    try {
        const upddateProject = await projects.findByIdAndUpdate({ _id: id },
            {

                title: title,
                language: language,
                github: github,
                Website: Website,
                Overview: Overview,
                projectImage: uploadProjectImage,
                userId: userId
            },
            { new: true }
        )
        await upddateProject.save()
        res.status(200).json("project updated successfully")
    } catch (err) {
        res.status(401).jason("unable to update due to:", err)
    }

}
exports.deleteUserProject = async (req, res) => {
    const {id} = req.params
    try {
        const removeProject = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json("project deleted successfully")
    }catch (err){
        res.status(401).json("delete failed",err)
    }
}




