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
