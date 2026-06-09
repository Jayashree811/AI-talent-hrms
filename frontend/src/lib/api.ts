const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type RegisterPayload = {
  email: string;
  password: string;
  role: string;
  first_name?: string;
  last_name?: string;
  job_title?: string;
};

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = "Request failed";
    try {
      const parsed = JSON.parse(errorText);
      errorMessage = parsed.detail || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export const api = {
  // Auth
  login: async (formData: URLSearchParams) => {
    return request('/api/v1/auth/login', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  },
  
  register: async (data: RegisterPayload) => {
    return request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  getMe: async () => {
    return request('/api/v1/auth/me');
  },

  // Employees
  getEmployees: async (skip = 0, limit = 50, deptId?: number) => {
    let url = `/api/v1/employees/?skip=${skip}&limit=${limit}`;
    if (deptId) url += `&department_id=${deptId}`;
    return request(url);
  },

  getEmployeeStats: async () => {
    return request('/api/v1/employees/stats');
  },

  getEmployeeProfile: async () => {
    return request('/api/v1/employees/me/profile');
  },

  getEmployeeDetail: async (id: number) => {
    return request(`/api/v1/employees/${id}`);
  },

  createEmployee: async (data: any) => {
    return request('/api/v1/employees/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  updateEmployee: async (id: number, data: any) => {
    return request(`/api/v1/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  predictAttrition: async (id: number, satisfaction: number, wlb: number, env: number, training: number) => {
    return request(`/api/v1/employees/${id}/predict-attrition?satisfaction_score=${satisfaction}&work_life_balance=${wlb}&environment_satisfaction=${env}&training_times_last_year=${training}`, {
      method: 'POST'
    });
  },

  getAttritionData: async (id: number) => {
    return request(`/api/v1/employees/${id}/attrition`);
  },

  analyzeSkillGap: async (id: number, targetRole: string) => {
    return request(`/api/v1/employees/${id}/analyze-gap?target_role=${encodeURIComponent(targetRole)}`, {
      method: 'POST'
    });
  },

  // Attendance
  punchIn: async (location = 'Office') => {
    return request('/api/v1/attendance/punch-in', {
      method: 'POST',
      body: JSON.stringify({ location })
    });
  },

  punchOut: async () => {
    return request('/api/v1/attendance/punch-out', {
      method: 'POST'
    });
  },

  getMyAttendance: async () => {
    return request('/api/v1/attendance/me');
  },

  getTeamAttendance: async () => {
    return request('/api/v1/attendance/team');
  },

  // Leaves
  requestLeave: async (data: any) => {
    return request('/api/v1/leaves/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  getMyLeaves: async () => {
    return request('/api/v1/leaves/me');
  },

  getPendingLeaves: async () => {
    return request('/api/v1/leaves/pending');
  },

  updateLeaveStatus: async (id: number, status: 'APPROVED' | 'REJECTED') => {
    return request(`/api/v1/leaves/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  // Notifications
  getMyNotifications: async () => {
    return request('/api/v1/notifications/me');
  },

  markNotificationRead: async (id: number) => {
    return request(`/api/v1/notifications/${id}/read`, {
      method: 'PATCH'
    });
  },

  // Jobs
  getJobs: async () => {
    return request('/api/v1/jobs/');
  },

  createJob: async (data: any) => {
    return request('/api/v1/jobs/', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  getJobDetail: async (id: number) => {
    return request(`/api/v1/jobs/${id}`);
  },

  // Candidates & Applications
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request('/api/v1/candidates/upload-resume', {
      method: 'POST',
      body: formData
    });
  },

  getCandidateProfile: async () => {
    return request('/api/v1/candidates/me/profile');
  },

  applyForJob: async (jobId: number) => {
    return request(`/api/v1/candidates/apply/${jobId}`, {
      method: 'POST'
    });
  },

  getMyApplications: async () => {
    return request('/api/v1/candidates/my-applications');
  },

  getCandidateRankings: async (jobId: number) => {
    return request(`/api/v1/candidates/rankings/${jobId}`);
  },

  // Interviews
  scheduleInterview: async (applicationId: number, type = 'VOICE') => {
    return request('/api/v1/interviews/schedule', {
      method: 'POST',
      body: JSON.stringify({ application_id: applicationId, interview_type: type })
    });
  },

  getInterview: async (id: number) => {
    return request(`/api/v1/interviews/${id}`);
  },

  sendInterviewChat: async (id: number, message: string, sender = 'candidate') => {
    return request(`/api/v1/interviews/${id}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message, sender })
    });
  },

  sendInterviewChatAudio: async (id: number, audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'response.webm');
    return request(`/api/v1/interviews/${id}/chat-audio`, {
      method: 'POST',
      body: formData
    });
  },

  evaluateInterview: async (id: number) => {
    return request(`/api/v1/interviews/${id}/evaluate`, {
      method: 'POST'
    });
  },

  approveScreening: async (appId: number) => {
    return request(`/api/v1/candidates/applications/${appId}/approve-screening`, {
      method: 'POST'
    });
  },

  acceptApplication: async (appId: number) => {
    return request(`/api/v1/candidates/applications/${appId}/accept`, {
      method: 'POST'
    });
  },

  rejectApplication: async (appId: number) => {
    return request(`/api/v1/candidates/applications/${appId}/reject`, {
      method: 'POST'
    });
  },

  // Copilot
  askCopilot: async (query: string) => {
    return request('/api/v1/copilot/', {
      method: 'POST',
      body: JSON.stringify({ query })
    });
  },

  // Performance Analyzer
  analyzePerformance: async (id: number) => {
    return request(`/api/v1/employees/${id}/analyze-performance`, {
      method: 'POST'
    });
  }
};
