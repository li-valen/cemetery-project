const UnsplashImage = ({ url, onClick }) => {
  return React.createElement("div", { className: "image-item", onClick }, 
    React.createElement("img", { src: url, alt: "Gallery item" })
  );
};

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  const contentWithLineBreaks = content.split('\n').map((line, index) => 
    React.createElement(React.Fragment, { key: index }, line, React.createElement("br"))
  );

  return React.createElement(
    "div", { className: "modal is-active" }, 
    React.createElement("div", { className: "modal-background", onClick: onClose }), 
    React.createElement("div", { className: "modal-content" }, 
      React.createElement("div", { className: "box" }, contentWithLineBreaks)
    ), 
    React.createElement("button", { className: "modal-close is-large", onClick: onClose, "aria-label": "close" })
  );
};

const Collage = () => {
  const allImages = [
    "/images/Document1.jpg",
    "/images/Document2.jpg",
    "/images/Document3.jpg",
    "/images/Document4.jpg",
    "/images/Document5.jpg",
    "/images/Document6.jpg",
    "/images/Document7.jpg",
    "/images/Document8.jpg",
    "/images/Document9.jpg",
    "/images/Document10.jpg",
    "/images/Document11.jpg",
    "/images/Document12.jpg",
    "/images/Document13.jpg",
    "/images/Document14.jpg",
    "/images/Document15.jpg",
    "/images/Document16.jpg",
    "/images/Document17.jpg",
    "/images/Document18.jpg",
    "/images/Document19.jpg",
    "/images/Document20.jpg",
    "/images/Document21.jpg",
    "/images/Document22.jpg",
    "/images/Document23.jpg",
    "/images/Document24.jpg",
    "/images/Document25.jpg",
  ];

  const imageTexts = [
    "Text for image1 with line break\nHere is the new line",
    "Text for image2 with line break\nAnother new line here",
    "Text for image3 with line break\nMore text after the break",
    "Text for image4 with line break\nHere is some more text",
    "Text for image5 with line break\nThis is a new line",
  ];

  const [images, setImages] = React.useState(allImages.slice(0, 50)); // Load first 3 images
  const [hasMore, setHasMore] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

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

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return React.createElement(
    "div", { className: "hero is-fullheight is-bold" }, 
    React.createElement("div", { className: "hero-body" }, 
      React.createElement("div", { className: "container" }, 
        React.createElement("div", { className: "header content" }, 
          React.createElement("h2", { className: "subtitle is-6" }, "James H. Campbell"),
          React.createElement("h1", { className: "title is-1" }, "Documents")
        ),
        React.createElement(InfiniteScroll, {
          dataLength: images.length,
          next: loadMoreImages,
          hasMore: hasMore,
          loader: React.createElement("span", { className: "loader" }, "Loading...")
        }, 
          React.createElement("div", { className: "image-grid", style: { marginTop: "60px" } },
            images.map((image, index) => React.createElement(UnsplashImage, { url: image, key: index, onClick: () => openModal(imageTexts[index]) }))
          )
        )
      ),
      React.createElement(Modal, { isOpen: isModalOpen, onClose: closeModal, content: modalContent })
    )
  );
};

// Render component
ReactDOM.render(React.createElement(Collage), document.getElementById("root"));
