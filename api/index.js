module.exports = (req, res) => {
  // 设置 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 模拟数据
  const admins = [
    { id: '1', username: 'admin', password: 'admin123', role: 'admin', name: '系统管理员' }
  ];

  const repairs = [
    { id: '1', title: '水管漏水', description: '厨房水管接口处漏水', status: 'pending', userName: '张先生', userPhone: '138****1234', address: '幸福小区1栋1单元101室', createTime: '2024-01-15 09:30' },
    { id: '2', title: '电梯故障', description: '3号电梯运行时有异响', status: 'processing', userName: '李女士', userPhone: '139****5678', address: '幸福小区2栋', createTime: '2024-01-14 14:20' },
    { id: '3', title: '门禁损坏', description: '单元门门禁刷卡无反应', status: 'completed', userName: '王先生', userPhone: '137****9012', address: '幸福小区3栋2单元', createTime: '2024-01-13 16:45' }
  ];

  const payments = [
    { id: '1', userName: '张先生', roomNumber: '1-1-101', amount: 350, type: 'property', status: 'unpaid', dueDate: '2024-01-25' },
    { id: '2', userName: '李女士', roomNumber: '2-3-502', amount: 120.5, type: 'water', status: 'paid', dueDate: '2024-01-20', paidDate: '2024-01-18' },
    { id: '3', userName: '王先生', roomNumber: '3-2-301', amount: 280, type: 'electricity', status: 'unpaid', dueDate: '2024-01-28' }
  ];

  const notices = [
    { id: '1', title: '2024年物业费缴纳通知', content: '请于1月31日前完成缴纳', type: 'notice', status: 'published', createTime: '2024-01-10 09:00', publishTime: '2024-01-10 10:00' },
    { id: '2', title: '春节联欢活动邀请', content: '1月28日举办春节联欢活动', type: 'activity', status: 'published', createTime: '2024-01-12 14:30', publishTime: '2024-01-12 15:00' }
  ];

  const users = [
    { id: '1', name: '张先生', phone: '138****1234', roomNumber: '101室', building: '1', unit: '1', checkInDate: '2022-03-15', status: 'active' },
    { id: '2', name: '李女士', phone: '139****5678', roomNumber: '502室', building: '2', unit: '3', checkInDate: '2021-08-20', status: 'active' },
    { id: '3', name: '王先生', phone: '137****9012', roomNumber: '301室', building: '3', unit: '2', checkInDate: '2023-01-10', status: 'active' }
  ];

  const url = req.url || '';
  const method = req.method || 'GET';

  // 登录
  if (url.includes('/admin/login') && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { username, password } = JSON.parse(body || '{}');
        const admin = admins.find(a => a.username === username && a.password === password);
        if (admin) {
          res.status(200).json({ code: 200, msg: '登录成功', data: { token: 'token-' + Date.now(), admin: { id: admin.id, username: admin.username, role: admin.role, name: admin.name } } });
        } else {
          res.status(200).json({ code: 401, msg: '用户名或密码错误', data: null });
        }
      } catch (e) {
        res.status(400).json({ code: 400, msg: '请求格式错误' });
      }
    });
    return;
  }

  // 仪表盘
  if (url.includes('/admin/dashboard')) {
    res.status(200).json({
      code: 200, msg: 'success',
      data: {
        pendingRepairs: repairs.filter(r => r.status === 'pending').length,
        monthIncome: 128500,
        pendingNotices: 2,
        totalUsers: users.length,
        recentRepairs: repairs.slice(0, 3)
      }
    });
    return;
  }

  // 报修列表
  if (url.includes('/admin/repair') && method === 'GET') {
    res.status(200).json({ code: 200, msg: 'success', data: repairs });
    return;
  }

  // 缴费列表
  if (url.includes('/admin/payment')) {
    res.status(200).json({ code: 200, msg: 'success', data: payments });
    return;
  }

  // 通知列表
  if (url.includes('/admin/notice')) {
    res.status(200).json({ code: 200, msg: 'success', data: notices });
    return;
  }

  // 业主列表
  if (url.includes('/admin/user')) {
    res.status(200).json({ code: 200, msg: 'success', data: users });
    return;
  }

  // 404
  res.status(404).json({ code: 404, msg: 'Not Found', url: url });
};
