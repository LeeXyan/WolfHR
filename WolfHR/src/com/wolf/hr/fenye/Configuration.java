package com.wolf.hr.fenye;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Configuration {

	private static int pageSize = 5;

	// ��ȡ�����ļ�������ʼ������
	static {
		InputStream in = Configuration.class.getClassLoader().getResourceAsStream("configuration.properties");
		Properties props = new Properties();
		try {
			// 1����ȡ�����ļ�
			props.load(in);

			// 2����ʼ������
			pageSize = Integer.parseInt(props.getProperty("pageSize"));

			System.out.println("------- �����ļ�������� ------");
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			try {
				in.close();
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}

	private Configuration() {
	}

	public static int getPageSize() {
		return pageSize;
	}

}
