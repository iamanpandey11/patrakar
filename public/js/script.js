
    
        function validateForm() {
            const formElement = document.getElementById('registrationForm');
            const formData = new FormData(formElement);
            let errorMessage = '';

            // Check if any required field is empty
            const requiredFields = ['first name', 'Mother name', 'Father name', 'Email', 'fqualification', 'Adhar', 'Gender', 'Nationality', 'address', 'number', 'pin code', 'dob', 'pan', 'photo', 'password'];
            for (const field of requiredFields) {
                if (!formData.get(field)) {
                    errorMessage = 'Please fill in all required fields.';
                    break;
                }
            }

            // Display error message or submit the form
            if (errorMessage) {
                document.getElementById('error-message').innerText = errorMessage;
            } else {
                document.getElementById('error-message').innerText = '';
                submitForm();
            }
        }

        function submitForm() {
            const formElement = document.getElementById('registrationForm');
            const formData = new FormData(formElement);

            // Make a POST request to your server
            fetch('/registration', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log(data); // Log the response from the server
                // Optionally, you can redirect to another page or show a success message
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                // Handle the error, show an error message, or redirect to an error page
            });
        }
    