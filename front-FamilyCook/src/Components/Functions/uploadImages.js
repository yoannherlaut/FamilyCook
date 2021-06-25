var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ddb9lp3zy/upload';
var CLOUDINARY_UPLOAD_PRESET = 'upload';

const uploadImage = async (file) => {
  var formData = new FormData();
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('file', file);

  const settings = {
    method: 'POST',
    body: formData,
  };
  try {
    const fetchResponse = await fetch(CLOUDINARY_URL, settings);
    const data = await fetchResponse.json();
    if (data) {
      return data.secure_url;
    }
  } catch (err) {
    console.log('ERROR FETCH UploadImage --->', err);
  }
};

export default uploadImage;
