const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis autem perferendis natus obcaecati fugiat? Corporis quia fugit reiciendis quisquam maxime! Sint fugit nihil illum perspiciatis totam, explicabo iusto, impedit earum dolores distinctio iure molestiae veritatis, necessitatibus dolorem voluptatibus maxime. Nihil quae ex fuga quibusdam qui pariatur excepturi, ab repudiandae magni non expedita iure quisquam maxime totam nobis aliquam placeat odit nulla, dicta necessitatibus repellat saepe, voluptatem mollitia laboriosam. Delectus soluta quo commodi impedit voluptas deleniti sunt consectetur accusamus dolore numquam, dolorem nam repudiandae possimus velit enim qui asperiores, perferendis vel in ex? Id, accusantium obcaecati nostrum ipsum delectus in, sapiente nihil enim error dolorem doloribus corrupti expedita provident. Vel corporis hic pariatur, sed vero ut placeat fugit atque assumenda ad? Eos incidunt illo atque enim suscipit quos ullam. Atque quos provident voluptas a, vitae quaerat cumque explicabo praesentium dolore accusamus fugit perferendis mollitia in omnis enim? Deserunt, corrupti. Aspernatur voluptates eaque accusantium quibusdam explicabo, est sint non maiores quo aliquid nemo magnam ex rem accusamus possimus. Voluptate est iste voluptas dicta magnam a sequi accusantium quidem illo ratione necessitatibus quisquam ad quaerat corporis, dolor, minima debitis sapiente deserunt quod temporibus expedita consectetur. Iste aliquam aspernatur, facilis quod aliquid accusantium fuga.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const posts = []
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const load = require("lodash");
const { lowerCase, truncate } = require("lodash");
const blog = express()



blog.use(bodyParser.urlencoded({ extended: true }))
blog.use(express.static(__dirname + '/public'));
blog.set('view engine', 'ejs');




blog.get("/",(req,res)=>{
    res.render("home",{home:homeStartingContent , allPost:posts})
})



blog.get("/about", (req,res)=>{
    res.render("about",{about:aboutContent})
})


blog.get("/contact", (req,res)=>{
    res.render("contact",{contact:contactContent})
})
blog.get("/compose", (req,res)=>{
    res.render("compose")
})
blog.post("/compose",(req,res)=>{
    let temp = {title: req.body.postTitle  , text: req.body.postText}
    posts.push(temp)
    res.redirect("/")
})



blog.get("/posts/:postName",(req,res)=>{
    let temp = load.lowerCase(req.params.postName)
    posts.forEach(post => {
        if(temp === load.lowerCase(post.title)){
            res.render("post",{titile:post.title , post:post.text})
        }
    });
})

blog.listen(3000,()=>{
    console.log("Server Started")
}) 