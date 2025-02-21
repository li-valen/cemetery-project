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
    "/images/Document1.png",
    "/images/Document2.png",
    "/images/Document3.png",
    "/images/Document4.png",
    "/images/Document5.png",
    "/images/Document6.png",
    "/images/Document7.png",
    "/images/Document8.png",
    "/images/Document9.png",
    "/images/Document10.png",
    "/images/Document11.png",
    "/images/Document12.png",
    "/images/Document13.png",
    "/images/Document14.png",
    "/images/Document15.png",
    "/images/Document16.png",
    "/images/Document17.png",
    "/images/Document18.png",
    "/images/Document19.png",
    "/images/Document20.png",
    "/images/Document21.png",
    "/images/Document22.png",
    "/images/Document23.png",
    "/images/Document24.png",
    "/images/Document25.png",
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
