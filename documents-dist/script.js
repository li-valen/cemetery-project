const UnsplashImage = ({ url, key }) => /*#__PURE__*/
React.createElement("div", { className: "image-item", key: key }, /*#__PURE__*/
React.createElement("img", { src: url }));



let Collage = () => {
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey =
    "25a6ce8664b4aef4027c7ca877021522ee500372ea770251b3ece9096788fe53";

    axios.
    get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`).
    then(res => {
      setImages([...images, ...res.data]);
      setIsLoaded(true);
      //console.log(images);
    }).
    catch(err => {
      // console.log(err);
      if (err.response.status === 403) {
        console.log('There have been too many many API requests recently. Try again later.');
      }
    });
  };

  // main component
  return /*#__PURE__*/(
    React.createElement("div", { className: "hero is-fullheight is-bold" }, /*#__PURE__*/
    React.createElement("div", { className: "hero-body" }, /*#__PURE__*/
    React.createElement("div", { className: "container" }, /*#__PURE__*/
    React.createElement("div", { className: "header content" }, /*#__PURE__*/
    React.createElement("h2", { className: "subtitle is-6" }, "Code Challenge #16"), /*#__PURE__*/
    React.createElement("h1", { className: "title is-1" }, "Infinite Scroll Gallery")), /*#__PURE__*/

    React.createElement(InfiniteScroll, {
      dataLength: images,
      next: () => fetchImages(5),
      hasMore: true,
      loader: /*#__PURE__*/
      React.createElement("span", { class: "loader" }) }, /*#__PURE__*/


    React.createElement("div", { className: "image-grid", style: { marginTop: "60px" } },
    loaded ?
    images.map((image, index) => /*#__PURE__*/
    React.createElement(UnsplashImage, { url: image.urls.regular, key: index })) :

    ""))))));






};

// Render the component to the DOM element with ID of root
ReactDOM.render( /*#__PURE__*/React.createElement(Collage, null), document.getElementById("root"));


/** This Gallery is a solution to a Code Challenge #16 by https://scotch.io **/