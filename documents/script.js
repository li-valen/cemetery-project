const UnsplashImage = ({ url, onClick }) => {
  return React.createElement(
    "div",
    { className: "image-item", onClick: () => onClick(url) },
    React.createElement("img", {
      src: url,
      alt: "Gallery item",
      style: { cursor: "pointer", maxWidth: "100%", borderRadius: "8px" }
    })
  );
};

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return React.createElement(
    "div",
    { className: "modal is-active" },
    React.createElement("div", { className: "modal-background", onClick: onClose }),
    React.createElement(
      "div",
      { className: "modal-content" },
      React.createElement("div", { className: "box" },
        content.image && React.createElement("img", {
          src: content.image,
          alt: "Selected",
          style: { maxWidth: "100%", marginBottom: "10px", borderRadius: "8px" }
        }),
        content.content.split('\n').map((line, index) =>
          React.createElement(React.Fragment, { key: index }, line, React.createElement("br"))
        )
      )
    ),
    React.createElement("button", {
      className: "modal-close is-large",
      onClick: onClose,
      "aria-label": "close"
    })
  );
};

const Collage = () => {
  const allImages = [
    "/images/Document1a.png",
    "/images/Document2a.png",
    "/images/Document2b.png",
    "/images/Document2c.png",
    "/images/Document2d.png",
    "/images/Document3a.png",
    "/images/Document4a.png",
    "/images/Document5a.png",
    "/images/Document5c.png",
    "/images/Document5d.png",
    "/images/Document6a.png",
    "/images/Document7a.png",
    "/images/Document7b.png",
    "/images/Document7c.png",
    "/images/Document8a.png",
    "/images/Document9a.png",
    "/images/Document10a.png",
    "/images/Document11a.png",
    "/images/Document11b.png",
    "/images/Document12a.png",
    "/images/Document12b.png",
    "/images/Document13a.png",
    "/images/Document13b.png",
    "/images/Document13c.png",
    "/images/Document13d.png",
    "/images/Document14a.png",
    "/images/Document15a.png",
    "/images/Document15b.png",
    "/images/Document15c.png",
    "/images/Document16a.png",
    "/images/Document17a.png",
    "/images/Document18a.png",
    "/images/Document19a.png",
    "/images/Document20a.png",
    "/images/Document21a.png",
    "/images/Document21b.png",
    "/images/Document22a.png",
    "/images/Document23a.png",
    "/images/Document24a.png",
    "/images/Document25a.png",
    "/images/Document26a.png",
    "/images/Document27a.png",
    "/images/Document27b.png",
    "/images/Document28a.png",
    "/images/Document29a.png",
    "/images/Document30a.png",
    "/images/Document30b.png",
    "/images/Document30c.png",
    "/images/Document31a.png",
    "/images/Document31b.png",
    "/images/Document32a.png",
    "/images/Document32b.png",
    "/images/Document33a.png",
    "/images/Document33b.png",
    "/images/Document34a.png",
    "/images/Document35a.png",
    "/images/Document36a.png",
    "/images/Document37a.png",
    "/images/Document38a.png",
    "/images/Document39a.png",
    "/images/Document40a.png",
    "/images/Document41a.png",
    "/images/Document42a.png",
    "/images/Document42b.png",
    "/images/Document34a.png",
    "/images/Document44a.png",
    "/images/Document44b.png",
    "/images/Document44c.png",
    "/images/Document45a.png",
    "/images/Document46a.png",
    "/images/Document47a.png",
    "/images/Document48a.png",
    "/images/Document49a.png",
    "/images/Document50a.png"
  ];

  const imageTexts = [
    "Document A\nCatalogue of the Officers and Students of Dickinson College, 1840-41. Dickinson College, Carlisle, 1840. \nThis excerpt taken from the Catalogue of the Officers and Students of Dickinson College from 1841 contains a section listing the students of the 16th Law Class of Dickinson Law College. In the excerpt, it can be seen that one James H. Campbell from Williamsport was studying at Dickinson Law School from the years 1840 to 1841.\nFrom this, it can be seen that Campbell received his education in law from Dickinson Law College, which, according to the Archives Department at Dickinson, is partially affiliated with the modern Dickinson College. It can also be inferred that Campbell was indeed born in Williamsport, as it is unlikely he moved residences before enrolling at the age of 20. As Dickinson Law College is located in Carlisle, it can be determined that Campbell indeed resided in Carlisle for approximately a year of his life. This also substantiates other documents detailing his admission onto the Bar in 1841 as it matches the year of his graduation from the Law Department.",
    "Document B\nWiley, Samuel T. Biographical and Portrait Cyclopedia of Schuylkill County Pennsylvania Comprising a Historical Sketch of the County. Philadelphia, Rush West & Company,  1893. https://babel.hathitrust.org/cgi/pt?id=coo1.ark:/13960/t4mk6wv50.\nThis cyclopedia of Schuylkill County during the 19th century documents one James H. Campbell as being admitted to the bar on October 18, 1841. The encyclopedia also notes that one J. H. Campbell attributed $100 to a fund dedicated to the financial aid of Union Civil War volunteers. From this, it can be inferred that Mr. Campbell was admitted to the bar in 1841 as multiple other documents/sources state, and on October 18. It can also be inferred that Campbell was a fervent supporter of the Union cause during the Civil War, as a sum of $100 in 1860 would amount to approximately $3,800 today. \n	It can also be noted that Campbell was listed as a member of the bar for Schuylkill County despite receiving his education in Carlisle, Cumberland County and previously residing in Williamsport, Lycoming County. From this, it can be inferred that Campbell was either prominent enough a lawyer to be listed in a city where he was not actually admitted to the bar or was admitted to the bar in Pottsville. A further extensive biography of General James Nagle could also be found toward the end of the cyclopedia that reveals Nagle’s activities regarding the 37th Regiment, which also had its separate entry. From this, the movements of Campbell during the term of his enlistment can be tracked.",
    "Document B\nWiley, Samuel T. Biographical and Portrait Cyclopedia of Schuylkill County Pennsylvania Comprising a Historical Sketch of the County. Philadelphia, Rush West & Company,  1893. https://babel.hathitrust.org/cgi/pt?id=coo1.ark:/13960/t4mk6wv50.\nThis cyclopedia of Schuylkill County during the 19th century documents one James H. Campbell as being admitted to the bar on October 18, 1841. The encyclopedia also notes that one J. H. Campbell attributed $100 to a fund dedicated to the financial aid of Union Civil War volunteers. From this, it can be inferred that Mr. Campbell was admitted to the bar in 1841 as multiple other documents/sources state, and on October 18. It can also be inferred that Campbell was a fervent supporter of the Union cause during the Civil War, as a sum of $100 in 1860 would amount to approximately $3,800 today. \n	It can also be noted that Campbell was listed as a member of the bar for Schuylkill County despite receiving his education in Carlisle, Cumberland County and previously residing in Williamsport, Lycoming County. From this, it can be inferred that Campbell was either prominent enough a lawyer to be listed in a city where he was not actually admitted to the bar or was admitted to the bar in Pottsville. A further extensive biography of General James Nagle could also be found toward the end of the cyclopedia that reveals Nagle’s activities regarding the 37th Regiment, which also had its separate entry. From this, the movements of Campbell during the term of his enlistment can be tracked.",
    "Document B\nWiley, Samuel T. Biographical and Portrait Cyclopedia of Schuylkill County Pennsylvania Comprising a Historical Sketch of the County. Philadelphia, Rush West & Company,  1893. https://babel.hathitrust.org/cgi/pt?id=coo1.ark:/13960/t4mk6wv50.\nThis cyclopedia of Schuylkill County during the 19th century documents one James H. Campbell as being admitted to the bar on October 18, 1841. The encyclopedia also notes that one J. H. Campbell attributed $100 to a fund dedicated to the financial aid of Union Civil War volunteers. From this, it can be inferred that Mr. Campbell was admitted to the bar in 1841 as multiple other documents/sources state, and on October 18. It can also be inferred that Campbell was a fervent supporter of the Union cause during the Civil War, as a sum of $100 in 1860 would amount to approximately $3,800 today. \n	It can also be noted that Campbell was listed as a member of the bar for Schuylkill County despite receiving his education in Carlisle, Cumberland County and previously residing in Williamsport, Lycoming County. From this, it can be inferred that Campbell was either prominent enough a lawyer to be listed in a city where he was not actually admitted to the bar or was admitted to the bar in Pottsville. A further extensive biography of General James Nagle could also be found toward the end of the cyclopedia that reveals Nagle’s activities regarding the 37th Regiment, which also had its separate entry. From this, the movements of Campbell during the term of his enlistment can be tracked.",
    "Document B\nWiley, Samuel T. Biographical and Portrait Cyclopedia of Schuylkill County Pennsylvania Comprising a Historical Sketch of the County. Philadelphia, Rush West & Company,  1893. https://babel.hathitrust.org/cgi/pt?id=coo1.ark:/13960/t4mk6wv50.\nThis cyclopedia of Schuylkill County during the 19th century documents one James H. Campbell as being admitted to the bar on October 18, 1841. The encyclopedia also notes that one J. H. Campbell attributed $100 to a fund dedicated to the financial aid of Union Civil War volunteers. From this, it can be inferred that Mr. Campbell was admitted to the bar in 1841 as multiple other documents/sources state, and on October 18. It can also be inferred that Campbell was a fervent supporter of the Union cause during the Civil War, as a sum of $100 in 1860 would amount to approximately $3,800 today. \n	It can also be noted that Campbell was listed as a member of the bar for Schuylkill County despite receiving his education in Carlisle, Cumberland County and previously residing in Williamsport, Lycoming County. From this, it can be inferred that Campbell was either prominent enough a lawyer to be listed in a city where he was not actually admitted to the bar or was admitted to the bar in Pottsville. A further extensive biography of General James Nagle could also be found toward the end of the cyclopedia that reveals Nagle’s activities regarding the 37th Regiment, which also had its separate entry. From this, the movements of Campbell during the term of his enlistment can be tracked.",
    "Document C\nLewisburg chronicle, and the West Branch farmer. Vol. 6 (Lewisburg, Pa.), 12 Dec. 1849. Chronicling America: Historic American Newspapers. Lib. of Congress. <https://chroniclingamerica.loc.gov/lccn/sn85055199/1849-12-12/ed-1/seq-1/>\nThe document is a newspaper clipping of a poem written by Juliet Hamersly Campbell, the wife of James Hepburn Campbell. Published in the Lewisburg Chronicle and the West Branch Farmer on December 12, 1849, Juliet's poem titled Hungary likely depicts the Hungarian Revolution of 1848 where Hungarians and other ethnic minorities in the country sought full independence from the Habsburg crown. \nThe publication of her poem depicts her successful career as an author during the Victorian Age. It is yet another sign of great wealth for the Campbell family as not only was education for women relatively gatekept to the very wealthy but also the chance of being published was often only granted to wealthier families. The topic of the poem itself can also be used to infer that Juliet was indeed a woman of “rare intellectual qualities” that was aware of the political woes of the world; the language used in her writing reflects a high level of education and creativity. From this, it can be concluded that Juliet was both an accomplished author and descendant from an affluent family that would have enabled her to cultivate such talent.",
    "4a",
    "5a",
    "5c",
    "5d",
    "6a",
    "7a",
    "7b",
    "7c",
    "8a",
    "9a",
    "10a",
    "11a",
    "11b",
    "12a",
    "12b",
    "13a",
    "13b",
    "13c",
    "13d",
    "14a",
    "15a",
    "15b",
    "15c",
    "16a",
    "17a",
    "18a",
    "19a",
    "20a",
    "21a",
    "21b",
    "22a",
    "23a",
    "24a",
    "25a",
    "26a",
    "27a",
    "27b",
    "28a",
    "29a",
    "30a",
    "30b",
    "30c",
    "31a",
    "31b",
    "32a",
    "32b",
    "33a",
    "33b",
    "34a",
    "35a",
    "36a",
    "37a",
    "38a",
    "39a",
    "40a",
    "41a",
    "42a",
    "42b",
    "34a",
    "44a",
    "44b",
    "44c",
    "45a",
    "46a",
    "47a",
    "48a",
    "49a",
    "50a"
  ];

  const [images, setImages] = React.useState(allImages.slice(0, 71)); // Load first 3 images
  const [hasMore, setHasMore] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({ image: "", content: "" });

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

  const openModal = (image) => {
    const index = allImages.indexOf(image);
    setModalContent({ image, content: imageTexts[index] || "No description available" });
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
            images.map((image, index) => React.createElement(UnsplashImage, { 
              url: image, 
              key: index, 
              onClick: () => openModal(image) 
            }))
          )
        )
      ),
      React.createElement(Modal, { isOpen: isModalOpen, onClose: closeModal, content: modalContent })
    )
  );
};

// Render component
ReactDOM.render(React.createElement(Collage), document.getElementById("root"));
