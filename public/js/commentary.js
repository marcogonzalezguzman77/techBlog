
const openCommentaryForm = (event) => {
  event.preventDefault();
  console.log('inside function');
  document.getElementById('all_commentaries').style.display = "none";
  document.getElementById('newCommentary_form').style.display = "block";
  document.getElementById('div_btnAddCommentary').style.display = "none";
}



const newCommentaryHandler = async (event) => {
event.preventDefault();
console.log('inside commentary handler');
const commentary = document.getElementById('commentary').value.trim();  
//console.log('commentary',commentary);
if (commentary) {
    const response = await fetch(`/api/commentaries`, {
    method: 'POST',
    body: JSON.stringify({ commentary }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const json = await response.json();
    console.log('response',json);    
    const url = window.location.href;
    const dashboard_id = url.split("/").pop();
    const commentaries_id = json.id;
    const commentary_id = commentaries_id;
    
    const responseDashComment = await fetch(`/api/dashboardcommentaries`, {
      method: 'POST',
      body: JSON.stringify({ dashboard_id, commentaries_id, commentary_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (responseDashComment.ok){
      const jsonDashComm = await responseDashComment.json();
      console.log('response',jsonDashComm);
      document.location.replace('/dashboard/'+jsonDashComm.dashboard_id);
    }

    

  } else {
    
    alert('Failed to create commentary');
  }
}
else {
  console.log('There is no commentary');
}
};




document
.getElementById('btn_addCommentary')
.addEventListener('click', openCommentaryForm);

document
.getElementById('btn_create_commentary')
.addEventListener('click', newCommentaryHandler);