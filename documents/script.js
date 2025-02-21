const UnsplashImage = ({ url }) => {
  return React.createElement("div", { className: "image-item" }, 
    React.createElement("img", { src: url, alt: "Gallery item" })
  );
};

let Collage = () => {
  const allImages = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
    "/images/image7.jpg",
    "/images/image8.jpg",
    "/images/image9.jpg",
    "/images/image10.jpg",
    "/images/image11.jpg",
    "/images/image12.jpg",
    "/images/image13.jpg",
    "/images/image14.jpg",
    "/images/image15.jpg",
    "/images/image16.jpg",
    "/images/image17.jpg",
    "/images/image18.jpg",
    "/images/image19.jpg",
    "/images/image20.jpg",
    "/images/image21.jpg",
    "/images/image22.jpg",
    "/images/image23.jpg",
    "/images/image24.jpg",
    "/images/image25.jpg",
  ];

  const [images, setImages] = React.useState(allImages.slice(0, 3)); // Load first 3 images
  const [hasMore, setHasMore] = React.useState(true);

  const loadMoreImages = () => {
    setTimeout(() => {
      if (images.length >= allImages.length) {
        setHasMore(false);
        return;
      }
      const nextBatch = allImages.slice(images.length, images.length + 3);
      setImages([...images, ...nextBatch]);
    }, 1000);
  };

  return React.createElement(
    "div", { className: "hero is-fullheight is-bold" }, 
    React.createElement("div", { className: "hero-body" }, 
      React.createElement("div", { className: "container" }, 
        React.createElement("div", { className: "header content" }, 
          React.createElement("h2", { className: "subtitle is-6" }, "Code Challenge #16"),
          React.createElement("h1", { className: "title is-1" }, "Infinite Scroll Gallery")
        ),
        React.createElement(InfiniteScroll, {
          dataLength: images.length,
          next: loadMoreImages,
          hasMore: hasMore,
          loader: React.createElement("span", { className: "loader" }, "Loading...")
        }, 
          React.createElement("div", { className: "image-grid", style: { marginTop: "60px" } },
            images.map((image, index) => React.createElement(UnsplashImage, { url: image, key: index }))
          )
        )
      )
    )
  );
};

// Render component
ReactDOM.render(React.createElement(Collage), document.getElementById("root"));
