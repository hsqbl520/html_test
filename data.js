// 数据管理对象
const DataManager = {
    // 初始化数据
    init() {
        this.records = {
            study: [],
            daily: [],
            relationship: [],
            plan: []
        };
        this.images = {
            home: null,
            backgrounds: {
                study: null,
                daily: null,
                relationship: null,
                plan: null
            }
        };
        this.loadData();
    },

    // 加载数据
    loadData() {
        const savedData = localStorage.getItem('life_records_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.records = data.records || this.records;
            this.images = data.images || this.images;
        }
    },

    // 保存数据
    saveData() {
        const data = {
            records: this.records,
            images: this.images
        };
        localStorage.setItem('life_records_data', JSON.stringify(data));
    },

    // 添加记录
    addRecord(category, content, image = null) {
        const record = {
            date: new Date().toLocaleString(),
            content: content,
            image: image
        };
        this.records[category].unshift(record);
        this.saveData();
    },

    // 删除记录
    deleteRecord(category, index) {
        this.records[category].splice(index, 1);
        this.saveData();
    },

    // 设置主页图片
    setHomeImage(imageUrl) {
        this.images.home = imageUrl;
        this.saveData();
    },

    // 设置分类背景图片
    setCategoryBackground(category, imageUrl) {
        this.images.backgrounds[category] = imageUrl;
        this.saveData();
    },

    // 获取分类记录
    getRecords(category) {
        return this.records[category] || [];
    },

    // 获取主页图片
    getHomeImage() {
        return this.images.home;
    },

    // 获取分类背景图片
    getCategoryBackground(category) {
        return this.images.backgrounds[category];
    },

    // 导出数据
    exportData() {
        return {
            records: this.records,
            images: this.images
        };
    },

    // 导入数据
    importData(data) {
        this.records = data.records || this.records;
        this.images = data.images || this.images;
        this.saveData();
    }
};

// 初始化数据管理器
DataManager.init(); 