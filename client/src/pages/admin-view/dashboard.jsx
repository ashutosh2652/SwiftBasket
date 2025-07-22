import { useEffect, useState } from "react";
import ProductImageUpload from "../../components/admin-view/Image-Upload";
import { Button } from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addfeatureImages, getfeatureImages } from "../../store/common";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setuploadImageUrl] = useState("");
  const [ImageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const { FeatureImageList } = useSelector((state) => state.FeatureImage);
  console.log(uploadImageUrl, "uploadImageUrl");
  function handleUploadImage() {
    dispatch(addfeatureImages(uploadImageUrl)).then((data) => {
      if (data.payload.success) {
        dispatch(getfeatureImages());
        setImageFile(null);
        setuploadImageUrl("");
      }
    });
  }
  useEffect(() => {
    dispatch(getfeatureImages());
  }, [dispatch]);
  console.log(FeatureImageList, "FeatureImageList");

  return (
    <div className="flex flex-col  justify-center gap-5">
      <h1 className="text-2xl text-black/60 font-bold">Manage Feature Image</h1>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadImageUrl={uploadImageUrl}
        setuploadImageUrl={setuploadImageUrl}
        setImageLoading={setImageLoading}
        ImageLoading={ImageLoading}
      />
      <Button
        className="w-full max-w-[150px] cursor-pointer mx-auto"
        onClick={handleUploadImage}
        disabled={uploadImageUrl.trim() === ""}
      >
        Upload
      </Button>
      <h2 className="text-2xl font-bold text-black/50 mx-auto  mt-10">
        FEATURE IMAGES
      </h2>
      <div className="flex flex-col">
        {FeatureImageList && FeatureImageList.length > 0
          ? FeatureImageList.map((image) => (
              <div className="relative">
                <img
                  className="w-full h-110 object-cover object-center mx-auto p-10"
                  src={image.image}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
export default AdminDashboard;
