import ProductImageUpload from '@/components/admin-view/image-upload';
import { Button } from '@/components/ui/button';
import { addFeatureImage, getFeatureImage } from '@/store/common-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard = () => {

    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const {featureImageList} = useSelector(state => state.commonSlice)
  
    const dispatch = useDispatch();

    const handleUploadFeatureImage = () => {
      dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
        if(data?.payload?.success) {
            dispatch(getFeatureImage());
            setUploadedImageUrl('');
            setImageFile(null);
        }
      })
    }

    useEffect(() => {
      dispatch(getFeatureImage())
    }, [dispatch]);

  return (
    <div>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isCustomStyling={true}
            // isEditMode={currentEditedId !== null}
          />
          <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">Upload</Button>
          <div className='flex flex-col gap-4 mt-5'>
            {
              featureImageList && featureImageList.length > 0 ? 
              featureImageList.map(featureImage => <div> 
                <img 
                src={featureImage.image}
                className='w-full h-[300px] object-cover rounded-lg' 
                />
              </div>) : null
            }
          </div>
    </div>
  )
}

export default AdminDashboard