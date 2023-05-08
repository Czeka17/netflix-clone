function saveLikesToLocalStorage(likes) {
    localStorage.setItem('likes', JSON.stringify(likes));
  }

  function loadLikesFromLocalStorage() {
    const likes = localStorage.getItem('likes');
    return likes ? JSON.parse(likes) : {};
  }

  export { saveLikesToLocalStorage, loadLikesFromLocalStorage };