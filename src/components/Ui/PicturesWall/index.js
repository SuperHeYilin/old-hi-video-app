import React from 'react'
import { Upload, Modal, message } from 'antd'
import { api } from '../../../utils'

class PicturesWall extends React.Component {
	state = {
		// name:this.props.name || "file",
		previewVisible: false,
		previewImage: '',
		length: this.props.length ? this.props.length : 1,
		maxFileSize: this.props.maxFileSize ? this.props.maxFileSize : 1,
		fileList: this.props.value instanceof Array ? this.props.value : [],
		action: api.getBaseUrl() + (this.props.action || "pt/file/image"),
		appid: "",
		secret: "",
		// imageHead: api.getBaseUrl() + this.props.action,
	}

	/**
	 * 关闭预览
	 */

	handleCancel = () => {
		this.setState({
			previewVisible: false,
		})
	}

	/**
	 * 查看预览
	 * @param file
	 */

	handlePreview = (file) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		})
	}

	/**
	 * 处理图片更新
	 * @param e
	 */

	handleChange = (e) => {
		const fileList = this.handleUpload(e)
		const flist = new Array()
		for (const lt in fileList) {
			if (fileList[lt].url) {
				flist.push(fileList[lt])
			}
		}
		if (flist.length > 0) {
			this.props.onChange(fileList)
		}
	}
	handleRemove = (e) => {
		this.props.onChange()
	}
	/**
	 * 处理更新
	 * @param e
	 * @returns {*}
	 */
	handleUpload = (e) => {
		// 再进行实际筛选，其实上面那一行没有用
		const fileList = e.fileList.map(file => {
			if (file.response) {
				// 这个地方是上传结束之后会调用的方法，这边是判断success!!!
				if (file.response.success) {
					return this.filter(file)
				}
			}
			return file
		})
		this.setState({
			fileList,
		})
		return fileList
	}

	/**
	 * 过滤服务器返回的数据
	 * @param file
	 */

	filter = (file) => {
		const {
			name,
			response,
			uid,
			status,
		} = file
		return {
			name,
			nameid: response.id,
			url: api.getBaseHost() + "/upload/" + response.id,
			uid,
			status,
		}
	}

	/**
	 * 上传之前的验证
	 */

	beforeUpload = (file) => {
		const maxFileSize = this.state.maxFileSize
		if (this.state.fileList.length + 1 > this.state.length) {
			message.warning("最多上传" + this.state.length + "张图片")
			return false
		}
		if (maxFileSize) {
			const isLtMax = file.size / 1024 / 1024 < maxFileSize
			if (!isLtMax) {
				message.error(`文件大小超过${maxFileSize}M限制`)
			}
			return isLtMax
		}
	}

	render() {
		const {
			previewVisible,
			previewImage,
			appid,
			secret,
		} = this.state
		const fileList = this.state.fileList
		// 一共有多少个图片
		const props = {
			action: this.state.action,
			fileList,
			data: { appid, secret },
			headers: {'X-Requested-With': null},
			accept: "image/jpg,image/jpeg,image/png,image/bmp",
			onChange: this.props.handleChange || this.handleChange,
			beforeUpload: this.props.beforeUpload || this.beforeUpload,
			onPreview: this.props.handlePreview || this.handlePreview,
			listType: this.props.listType || "picture-card",
			onRemove: this.props.onRemove || this.handleRemove,
		}
		const uploadButton = fileList.length >= this.state.length ? null : (this.props.children)
		return (
			<div className="clearfix">
				{this.props.dragger ? <Upload.Dragger {...props}>{uploadButton}</Upload.Dragger> : <Upload {...props}>{uploadButton}</Upload>}
				<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</div>
		)
	}
}
export default PicturesWall