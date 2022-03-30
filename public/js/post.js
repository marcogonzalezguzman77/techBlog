const openPostForm = (event) => {
    event.preventDefault();
    console.log('inside openPostForm function');
    document.getElementById('all_myposts').style.display = "none";
    document.getElementById('newPost_form').style.display = "block";
    document.getElementById('div_btnAddPost').style.display = "none";
}



const newFormPostHandler = async (event) => {
  event.preventDefault();
  console.log('inside newFormPostHandler');
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

const buttonHandler = async (event) => {
 // event.preventDefault();
 //for deleting the post
  if (event.target.hasAttribute('data-iddelete')) {
    console.log('inside delete');
    const id = event.target.getAttribute('data-iddelete');
    console.log('id dashboard',id);
    
    const response = await fetch(`/api/dashboards/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const json = await response.json();
      console.log('response',json);
      document.location.replace('/mydashboard/'+json.user_id);
    } else {
      alert('Failed to delete dashboard');
    }
    
  }

  //for visualizing the update post form
  if (event.target.hasAttribute('data-idupdate')) {
    event.preventDefault();
   console.log('inside update');
   const id = event.target.getAttribute('data-idupdate');
   console.log('data update',id);    
  
   document.getElementById('div-update-dashboard-'+id).style.display = "block";
   document.getElementById('div-dashboard-'+id).style.display = "none";
   document.getElementById('div-commentary-'+id).style.display = "none";
    

  }

  //for updating the post
  if (event.target.hasAttribute('data-idupdateform')) {
      console.log('inside update form');
      const id = event.target.getAttribute('data-idupdateform');
      console.log('data update form',id); 
      
      const name = document.querySelector('#post-name-update-'+id).value.trim();  
      const description = document.querySelector('#post-desc-update-'+id).value.trim();

      if (name && description) {
        const response = await fetch(`/api/dashboards/${id}`, {
          method: 'PUT',
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
   
   }


};


document
  .getElementById('btn_addPost')
  .addEventListener('click', openPostForm);

document
  .getElementById('btn_create')
  .addEventListener('click', newFormPostHandler);

  /*
document
  .getElementById('btn_updatePost')
  .addEventListener('click', openUpdateForm);
*/
document
  .querySelector('.dashboard-list')
  .addEventListener('click', buttonHandler);
