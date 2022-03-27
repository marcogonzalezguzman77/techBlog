const openPostForm = (event) => {
    event.preventDefault();
    console.log('inside function');
    document.getElementById('all_myposts').style.display = "none";
    document.getElementById('newPost_form').style.display = "block";
    document.getElementById('div_btnAddPost').style.display = "none";
}



const newFormPostHandler = async (event) => {
  event.preventDefault();
  
  const name = document.querySelector('#post-name').value.trim();  
  const description = document.querySelector('#post-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/dashboards`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();
      console.log('response',json);
      document.location.replace('/mydashboard/'+json.user_id);
    } else {
      alert('Failed to create dashboard');
    }
  }
};




document
  .getElementById('btn_addPost')
  .addEventListener('click', openPostForm);

  document
  .getElementById('btn_create')
  .addEventListener('click', newFormPostHandler);