package com.wolf.hr.fenye;

import java.util.List;

@SuppressWarnings("unchecked")
public class PageBean {

	// ���ݵĲ��������õ�ֵ
	private int currentPage; // ��ǰҳ
	private int pageSize; // ÿҳ��ʾ��������¼

	// ��ѯ���ݿ�
	private int recordCount; // �ܼ�¼��
	private List recordList; // ��ҳ�������б�

	// ����
	private int pageCount; // ��ҳ��
	private int beginPageIndex; // ҳ���б�Ŀ�ʼ����
	private int endPageIndex; // ҳ���б�Ľ�������

	/**
	 * ֻ����4����Ҫ������ֵ�����Զ��ļ��������3�����Ե�ֵ
	 * 
	 * @param currentPage
	 * @param pageSize
	 * @param recordCount
	 * @param recordList
	 */
	public PageBean(int currentPage, int pageSize, int recordCount, List recordList) {
		this.currentPage = currentPage;
		this.pageSize = pageSize;
		this.recordCount = recordCount;
		this.recordList = recordList;

		// ���� pageCount
		this.pageCount = (recordCount + pageSize - 1) / pageSize;

		// ����beginPageIndex��endPageIndex
		// 1����ҳ����<=10����ȫ����ʾ
		if (pageCount <= 10) {
			beginPageIndex = 1;
			endPageIndex = pageCount;
		}
		// 2����ҳ����>10
		else {
			// 1����ʾ��ǰҳ�����Ĺ�10��ҳ�루ǰ4��+��ǰҳ+��5����
			beginPageIndex = currentPage - 4;
			endPageIndex = currentPage + 5;
			// 2��ǰ�治��4��ҳ��ʱ����ʾǰ10��ҳ��
			if (beginPageIndex < 1) {
				beginPageIndex = 1;
				endPageIndex = 10;
			}
			// 3�����治��5��ҳ��ʱ����ʾ��10��ҳ��
			else if (endPageIndex > pageCount) {
				endPageIndex = pageCount;
				beginPageIndex = pageCount - 9; // ��Ϊ��ʾʱ���������߽磬��������Ҫ��9������13-10=3����3��13����ʾ11��ҳ�룬����Ҫ13-9����ʾ��4��13��10��ҳ��
			}
		}

	}

	public List getRecordList() {
		return recordList;
	}

	public void setRecordList(List recordList) {
		this.recordList = recordList;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}

	public int getBeginPageIndex() {
		return beginPageIndex;
	}

	public void setBeginPageIndex(int beginPageIndex) {
		this.beginPageIndex = beginPageIndex;
	}

	public int getEndPageIndex() {
		return endPageIndex;
	}

	public void setEndPageIndex(int endPageIndex) {
		this.endPageIndex = endPageIndex;
	}

}
