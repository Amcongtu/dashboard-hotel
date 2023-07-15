import defautlimage from "../../public/images/banner1.jpg"

const getDataCloudinary = (image,folder)=>{
    console.log("toi", image )
    const data = new FormData()

    if(image){
        
        data.append('file',image)
        data.append('upload_preset',"demo_upload")
        data.append('folder',folder)
        return data
    }
    data.append('file',defautlimage)
    data.append('upload_preset',"demo_upload")
    data.append('folder',folder)
    return data
    
}
const getUpCloudinary = async(url,image,folder)=>{

    const data = getDataCloudinary(image,folder)

    const res = await fetch(url,{
        method: 'POST',

        body: data
    })
    const result = await res.json()
    return result
}
async function processImages(content,folder_url) {
    const images = content.match(/<img.*?src="(.*?)"/g);
  
    let imageUrls = [];

    let public_id_cloud=[]
    try{

        if (images) {

        for (let i = 0; i < images.length; i++) {
            const imgUrl = images[i].match(/src="(.*?)"/)[1];

            const result = await  getUpCloudinary(
                `https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUD_NAME}/image/upload`,
                imgUrl,
            `/${folder_url}`
            )


            const newImgUrl = result.secure_url; // Lấy đường dẫn của ảnh từ Cloudinary
            content = content.replace(imgUrl, newImgUrl); // Thay đổi đường dẫn của ảnh trong nội dung

            public_id_cloud.push(result.public_id)
            imageUrls.push(newImgUrl); // Thêm đường dẫn của ảnh mới vào mảng
        }
        // console.log("---------------------")
        //     console.log(newContent)

        // Trả về nội dung mới và mảng đường dẫn ảnh
    }
    return { content, imageUrls ,public_id_cloud}; 
    }catch(err){
        return { content, imageUrls ,public_id_cloud}
    }
}


export {getUpCloudinary,processImages}