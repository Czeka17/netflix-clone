function saveLikesToLocalStorage(likes:{ [key: number]: boolean }) {
    localStorage.setItem('likes', JSON.stringify(likes));
  }

  function loadLikesFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const likes = localStorage.getItem('likes');
      return likes ? JSON.parse(likes) : {};
    } else {
      return {};
    }
  }

  export { saveLikesToLocalStorage, loadLikesFromLocalStorage };