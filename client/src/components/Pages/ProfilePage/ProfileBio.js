import React from 'react'

const ProfileBio = (props) => {
    const { currentProfile } = props;
    return (
        <div>
            <div>
                {
                    currentProfile?.tags ? (
                        <>

                            <h4 className='user-tags-heading'>Tags Watched</h4>
                            <div className='user-tags-container'>
                            {
                                currentProfile.tags.map((tag) => (
                                    <p key={tag} className='profile-tags'>{tag}</p>
                                ))
                            }
                            </div>
                        </>

                    ) : (
                        <p>0 tags watched</p>
                        
                    )
                }
                <hr />
            </div>
            <div>
                {
                    currentProfile?.about ? (
                        <>
                            <h4>About</h4>
                            <p>{currentProfile.about}</p>
                        </>
                    ) : (
                        <p>No Bio found </p>
                    )
                }
            </div>
            <br />
            <hr />
        </div>
    )
}

export default ProfileBio
