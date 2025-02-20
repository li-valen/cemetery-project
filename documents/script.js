const UnsplashImage = ({ url, key }) => (
  <div className="image-item" key={key}>
    <img src= {url} />
  </div>
);

let Collage = () => {
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  React.useEffect( () => {
    fetchImages();
  }, [] );

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey =
          "25a6ce8664b4aef4027c7ca877021522ee500372ea770251b3ece9096788fe53";

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then(res => {
      setImages([...images, ...res.data]);
      setIsLoaded(true);
      //console.log(images);
    })
      .catch(err => {
        // console.log(err);
        if (err.response.status === 403) {
          console.log('There have been too many many API requests recently. Try again later.');
      }    
      });
  };
  
  // main component
  return (
    <div className="hero is-fullheight is-bold">
      <div className="hero-body">
        <div className="container">
          <div className="header content">
            <h2 className="subtitle is-6">Code Challenge #16</h2>
            <h1 className="title is-1">Infinite Scroll Gallery</h1>
          </div>
          <InfiniteScroll
            dataLength={images}
            next={() => fetchImages(5)}
            hasMore={true}
            loader={
              <span class="loader"></span>
            }
            >
            <div className="image-grid" style={{ marginTop: "60px" }}>
              {loaded
                ? images.map((image, index) => (
                <UnsplashImage url={image.urls.regular} key={index} />
              ))
              : ""}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

// Render the component to the DOM element with ID of root
ReactDOM.render(<Collage />, document.getElementById("root"));


/** This Gallery is a solution to a Code Challenge #16 by https://scotch.io **/ 