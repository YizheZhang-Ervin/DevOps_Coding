class reptile{
	public static void main(String[] args){
		URL url = new URL("http://aa.bb.cc?dd=ee");
		HttpURLConnection con =(HttpURLConnection) url.openConnection();
		con.setRequestMethod("GET");
		int responseCode = con.getResponseCode();
		if (responseCode == HttpURLConnection.HTTP_OK){
    			//读取响应内容
		}
	}
}
