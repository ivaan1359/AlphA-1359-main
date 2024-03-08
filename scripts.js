 
    // Existing JavaScript code...
    // Save content to local storage with a specified document name
    function saveContentLocally() {
        const content = document.getElementById('editor').innerHTML;
        const docName = document.getElementById('docName').value || 'Untitled Document';
        localStorage.setItem(`editorContent_${docName}`, content);
        updateDocumentList();
        alert('Content saved locally!');
      }
  
      // Load content from local storage
      function loadcontent() {
        const docName = prompt('Enter document name to load:');
        const content = localStorage.getItem(`editorContent_${docName}`);
        document.getElementById('editor').innerHTML = content || 'File not found.';
      }
  
      // Function to download content as .docx
      function downloadDocx() {
        const content = document.getElementById('editor').innerHTML;
        const docName = document.getElementById('docName').value || 'document';
        const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${docName}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
  
      // Function to format selected text
      function formatText(command, value = null) {
        document.execCommand(command, false, value);
      }
  
      // Function to remove formatting
      function clearFormatting() {
        document.execCommand('removeFormat', false, null);
      }
  
      // Function to insert a bulleted list
      function insertBulletedList() {
        document.execCommand('insertUnorderedList', false, null);
      }
  
      // Function to insert a heading
      function insertHeading() {
        document.execCommand('formatBlock', false, 'h2');
      }
  
      // Function to insert a paragraph
      function insertParagraph() {
        document.execCommand('formatBlock', false, 'p');
      }
  
      // Function to create a new document (clears the editor)
      function createNewDocument() {
        document.getElementById('editor').innerHTML = '';
        document.getElementById('docName').value = '';
      }
  
      // Function to update the document list
      function updateDocumentList() {
        const documentList = document.getElementById('documentList');
        documentList.innerHTML = '';
  
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('editorContent_')) {
            const docName = key.replace('editorContent_', '');
  
            const listItem = document.createElement('li');
            listItem.className = 'documentListItem';
  
            const fileNameButton = document.createElement('button');
            fileNameButton.innerHTML = docName;
            fileNameButton.onclick = function() {
              loadDocumentByName(docName);
            };
  
            const copyButton = document.createElement('button');
            copyButton.className = 'copyButton';
            copyButton.innerHTML = 'copy filename';
            copyButton.onclick = function() {
              copyToClipboard(docName);
            };
  
            listItem.appendChild(fileNameButton);
            listItem.appendChild(copyButton);
            documentList.appendChild(listItem);
          }
        }
      }
  
      // Function to delete a document
      function deleteDocument() {
        const docName = prompt('Enter document name to delete:');
        if (docName) {
          localStorage.removeItem(`editorContent_${docName}`);
          updateDocumentList();
          alert(`Document "${docName}" deleted!`);
        }
      }
  
      // Function to edit or view a document
      function editOrViewDocument() {
        const docName = prompt('Enter document name to edit/view:');
        if (docName) {
          loadDocumentByName(docName);
        }
      }
  
      // Placeholder for additional functionalities
      function moreOptions() {
        // Add more options here
        alert('Placeholder for additional functionalities!');
      }
  
      // Function to load a document by name
      function loadDocumentByName(docName) {
        const content = localStorage.getItem(`editorContent_${docName}`);
        document.getElementById('editor').innerHTML = content || 'File not found.';
        document.getElementById('docName').value = docName;
      }
  
      // Function to copy text to clipboard
      function copyToClipboard(text) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        alert(`Filename "${text}" copied to clipboard!`);
      }
  
      // Function to change the background color of the page
      function changePageColor() {
        const colorList = ['#ffffff', '#f2f2f2', '#e6e6e6', '#d9d9d9', '#cccccc', '#b3b3b3', '#999999', '#666666', '#333333', '#000000'];
  
        const colorPicker = document.createElement('div');
        colorPicker.style.display = 'flex';
        colorPicker.style.flexWrap = 'wrap';
        colorPicker.style.gap = '5px';
  
        colorList.forEach(color => {
          const colorButton = document.createElement('button');
          colorButton.style.backgroundColor = color;
          colorButton.style.width = '30px';
          colorButton.style.height = '30px';
          colorButton.style.border = 'none';
          colorButton.style.cursor = 'pointer';
  
          colorButton.addEventListener('click', function () {
            document.getElementById('editor').style.backgroundColor = color;
            colorPicker.remove();
          });
  
          colorPicker.appendChild(colorButton);
        });
  
        document.getElementById('toolbar').appendChild(colorPicker);
      }
      // Function to show the text options popup
      function showTextOptions() {
        const selection = document.getSelection();
        const textOptionsPopup = document.getElementById('textOptionsPopup');
  
        if (!selection.isCollapsed) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
  
          textOptionsPopup.style.display = 'block';
          textOptionsPopup.style.left = `${rect.left + window.scrollX}px`;
          textOptionsPopup.style.top = `${rect.bottom + window.scrollY}px`;
        } else {
          textOptionsPopup.style.display = 'none';
        }
      }
  
      // Function to change the background color of the page
      function changePageColor() {
        const colorList = ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  
        const colorPicker = document.createElement('div');
        colorPicker.style.display = 'flex';
        colorPicker.style.flexWrap = 'wrap';
        colorPicker.style.gap = '5px';
  
        colorList.forEach(color => {
          const colorButton = document.createElement('button');
          colorButton.style.backgroundColor = color;
          colorButton.style.width = '30px';
          colorButton.style.height = '30px';
          colorButton.style.border = 'none';
          colorButton.style.cursor = 'pointer';
  
          colorButton.addEventListener('click', function () {
            document.getElementById('editor').style.backgroundColor = color;
            colorPicker.remove();
          });
  
          colorPicker.appendChild(colorButton);
        });
  
        document.getElementById('toolbar').appendChild(colorPicker);
      }
  
      // Function to change the font color in the editor
      function changeFontColor() {
        const colorList = ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  
        const colorPicker = document.createElement('div');
        colorPicker.style.display = 'flex';
        colorPicker.style.flexWrap = 'wrap';
        colorPicker.style.gap = '5px';
  
        colorList.forEach(color => {
          const colorButton = document.createElement('button');
          colorButton.style.backgroundColor = color;
          colorButton.style.width = '30px';
          colorButton.style.height = '30px';
          colorButton.style.border = 'none';
          colorButton.style.cursor = 'pointer';
  
          colorButton.addEventListener('click', function () {
            document.execCommand('foreColor', false, color);
            colorPicker.remove();
          });
  
          colorPicker.appendChild(colorButton);
        });
  
        document.getElementById('toolbar').appendChild(colorPicker);
      }
  
      // Load content and update document list on page load
      window.addEventListener('load', function() {
        loadcontent();
        updateDocumentList();
      });