const Card = ({ title, description, imgSrc }) => {
  return (
    <div className="bg-light rounded my-card  m-3 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center">
        <img
          className="img-flush  img-resize d-block my-4"
          src={imgSrc ? imgSrc : "./no-photo.jpg"}
        />
      </div>
      <h3 className=" text-succcess rounded p-2 bg-white text-success fw-600 fs-30 my-2">
        {title}
      </h3>
      <p className=" text-center p-3 b-light text-dark lead"> {description}</p>
    </div>
  );
};

export default Card;
