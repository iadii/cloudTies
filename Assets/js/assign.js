$(document).ready(function() {
    let jobCounter = 1;

    
    $('#saveJobBtn').click(function() {
        const jobName = $('#jobName').val();
        const jobDescription = $('#jobDescription').val();
        const jobStartDate = $('#jobStartDate').val();
        const jobEndDate = $('#jobEndDate').val();

        if(!jobName || !jobDescription || !jobStartDate || !jobEndDate) {
            alert('Please fill in all required fields');
            return;
        }

        jobCounter++;
        const jobId = 'job' + jobCounter;

        const newJob = `
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#jobAccordion" href="#${jobId}">
                            ${jobName}
                        </a>
                        <button class="btn btn-xs btn-danger pull-right delete-job">Delete Job</button>
                    </h4>
                </div>
                <div id="${jobId}" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12">
                                <strong>Job Description:</strong> ${jobDescription}
                                <br>
                                <strong>Start Date:</strong> ${jobStartDate}
                                <strong>End Date:</strong> ${jobEndDate}
                                <br><br>
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Task Name</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Due Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#addTaskModal">
                                    Add Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('#jobAccordion').append(newJob);
        $('#addJobModal').modal('hide');
        $('#addJobForm')[0].reset();
    });

    
    $(document).on('click', '.delete-job', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if(confirm('Are you sure you want to delete this job and all its tasks?')) {
            $(this).closest('.panel').remove();
        }
    });

   
    $('#saveTaskBtn').click(function() {
        const taskName = $('#taskName').val();
        const taskDescription = $('#taskDescription').val();
        const taskDueDate = $('#taskDueDate').val();
        const taskStatus = $('#taskStatus').val();

        if(!taskName || !taskDescription || !taskDueDate) {
            alert('Please fill in all required fields');
            return;
        }

        const newRow = `
            <tr>
                <td>${taskName}</td>
                <td>${taskDescription}</td>
                <td>${taskStatus}</td>
                <td>${taskDueDate}</td>
                <td>
                    <button class="btn btn-xs btn-default edit-task">Edit</button>
                    <button class="btn btn-xs btn-danger delete-task">Delete</button>
                </td>
            </tr>
        `;

      
        $('.panel-collapse.in').find('tbody').append(newRow);
        $('#addTaskModal').modal('hide');
        $('#addTaskForm')[0].reset();
    });

    $(document).on('click', '.delete-task', function() {
        if(confirm('Are you sure you want to delete this task?')) {
            $(this).closest('tr').remove();
        }
    });

    $(document).on('click', '.edit-task', function() {
        const row = $(this).closest('tr');
        const taskName = row.find('td:eq(0)').text();
        const taskDescription = row.find('td:eq(1)').text();
        const taskStatus = row.find('td:eq(2)').text();
        const taskDueDate = row.find('td:eq(3)').text();

        $('#taskName').val(taskName);
        $('#taskDescription').val(taskDescription);
        $('#taskStatus').val(taskStatus);
        $('#taskDueDate').val(taskDueDate);

        $('#addTaskModal').modal('show');
        row.remove();
    });

    $('#addJobModal, #addTaskModal').on('hidden.bs.modal', function() {
        $(this).find('form')[0].reset();
    });
});