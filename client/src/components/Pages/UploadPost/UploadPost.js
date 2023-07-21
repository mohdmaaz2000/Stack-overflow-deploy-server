import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'
import { postNewPost } from '../../../actions/post';
import './UploadPost.css'

const UploadPost = () => {
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileType, setFileType] = useState(null);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUserReducer);
    const navigate = useNavigate();
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setContent(content + "\n");
        }
    }

    // to preview the image and photos
    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            setFile(null);
            setPreview(null);
            return;
        }

        setFile(selectedFile);

        if (selectedFile.type.startsWith('image/')) {
            setFileType('image');
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else if (selectedFile.type.startsWith('video/')) {
            setPreview(URL.createObjectURL(selectedFile));
            setFileType('video');
        }
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (file === null && content === '') {
            toast.warning("Can't post an empty post", {
                position: toast.POSITION.TOP_CENTER,
                theme: 'colored'
            });
        }
        else {
            setLoading(true);
            let formData = new FormData();
            formData.append('file', file);
            formData.append("upload_preset", 'stack_post');

            try {
                if(file !== null){
                let cloudName = process.env.REACT_APP_CLOUDINARY_NAME;
                let api = `https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`;
                const res = await axios.post(api, formData);
                dispatch(postNewPost(currentUser?.result._id, { content, userPosted: currentUser?.result.name, file: res.data }));
            }else{
                dispatch(postNewPost(currentUser?.result._id,{content,userPosted:currentUser?.result.name,file}))
            }
            setLoading(false);
                navigate('/post');
            } catch (err) {
                toast.error("Error in uploading post", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: 'colored'
                });
            }
        }
    }
    const divStyle = {
        background: `url('${preview}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        marginTop: '20px'
    }

    return (
        <div className='upload-post-container'>

            <form onSubmit={handlePostSubmit}>
                <div className="new-post-form-container">
                    <h1>Upload Post</h1>
                    <label htmlFor="new-post-description">
                        <h4>Description</h4>
                        <textarea id="new-post-description" cols="25" rows="5" onChange={(e) => setContent(e.target.value)} onKeyPress={handleEnter}></textarea>
                    </label>
                    <label htmlFor="new-post-image">
                        <h4>Image</h4>
                        <input type="file" id="new-post-image" onChange={handleFileInputChange} />
                    </label>
                    {preview &&
                        <>
                            {
                                preview.startsWith('data:image/') && (<>
                                    <div className='post-image' style={divStyle}></div>
                                    <p className='preview-file-p'>Preview of photo</p>
                                </>
                                )
                            }
                            {preview.startsWith('blob:') && (<>
                                <video src={preview} controls className='post-image' />
                                <p className='preview-file-p'>Preview of video</p>
                            </>
                            )}

                        </>
                    }
                    <input type="submit" accept="image/*, video/*" value="Post" className={`new-post-btn ${loading === true ? 'post-disabled' : ''}`} />
                    {
                        loading === true &&
                        <div className='loader-container'>
                            <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                color="#009dff"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />
                        </div>
                    }
                </div>
            </form >
        </div >
    )
}

export default UploadPost
