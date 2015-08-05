/*
**************************************************************************************************************************
** CORAL Organizations Module v. 1.0
**
** Copyright (c) 2010 University of Notre Dame
**
** This file is part of CORAL.
**
** CORAL is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
**
** CORAL is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
**
** You should have received a copy of the GNU General Public License along with CORAL.  If not, see <http://www.gnu.org/licenses/>.
**
**************************************************************************************************************************
*/

 $(document).ready(function(){
 	updateOrganization();
 	updateAliases();
 	updateContacts();
 	updateArchivedContacts(0);
 	updateAccount();
 	updateIssues();
 	updateResourceIssues();
 	updateLicenses();
 


	viewAll=0;

	 $(".showOrganization").click(function () {
		if (viewAll == 0){
			$('#div_organization').show();
			$('#div_aliases').hide();
			$('#div_contacts').hide();
			$('#div_account').hide();
			$('#div_issues').hide();
			$('#div_resourceissues').hide();
			$('#div_licenses').hide();
		}
		return false;
	 });


	 $(".showAliases").click(function () {
		if (viewAll == 0){
			$('#div_organization').hide();
			$('#div_aliases').show();
			$('#div_contacts').hide();
			$('#div_account').hide();
			$('#div_issues').hide();
			$('#div_resourceissues').hide();
			$('#div_licenses').hide();
		}
		return false;

	 });

	  $(".showContacts").click(function () {
		if (viewAll == 0){
			$('#div_organization').hide();
			$('#div_aliases').hide();
			$('#div_contacts').show();
			$('#div_account').hide();
			$('#div_issues').hide();
			$('#div_resourceissues').hide();
			$('#div_licenses').hide();
		}
		return false;
	 });

	  $(".showAccount").click(function () {
		if (viewAll == 0){
			$('#div_organization').hide();
			$('#div_aliases').hide();
			$('#div_contacts').hide();
			$('#div_account').show();
			$('#div_issues').hide();
			$('#div_resourceissues').hide();
			$('#div_licenses').hide();
		}
		return false;
	 });

	  $(".showIssues").click(function () {
		if (viewAll == 0){
			$('#div_organization').hide();
			$('#div_aliases').hide();
			$('#div_contacts').hide();
			$('#div_account').hide();
			$('#div_issues').show();
			$('#div_resourceissues').hide();
			$('#div_licenses').hide();
		}
		return false;
	 });


	$("#createIssueBtn").live("click", function() {
		$(".issueList").slideUp(250);
	});

	  $(".showResourceIssues").click(function () {
		if (viewAll == 0){
			$('#div_organization').hide();
			$('#div_aliases').hide();
			$('#div_contacts').hide();
			$('#div_account').hide();
			$('#div_issues').hide();
			$('#div_resourceissues').show();
			$('#div_licenses').hide();
		}
		return false;
	 });

	  $(".showLicenses").click(function () {
		if (viewAll == 0){
			$('#div_organization').hide();
			$('#div_aliases').hide();
			$('#div_contacts').hide();
			$('#div_account').hide();
			$('#div_issues').hide();
			$('#div_resourceissues').hide();
			$('#div_licenses').show();
		}
		return false;
	 });


	$(function(){
		$('.date-pick').datePicker({startDate:'01/01/1996'});
	});

	$("#submitCloseResourceIssue").live("click", function() {
		submitCloseResourceIssue();
	});

	$("#submitNewResourceIssue").live("click", function(e) {
		e.preventDefault();
		submitNewResourceIssue();
	});

	$(".issuesBtn").live("click", function(e) {
		e.preventDefault();
		getResourceIssues($(this));
	});

	$(".issueResources").live("click", function() {

		$(".issueResources").attr("checked", false);
		$(this).attr("checked", true);

		if($(this).attr("id") == "otherResources") {
			$("#resourceIDs").fadeIn(250)
		} else {
			$("#resourceIDs").fadeOut(250)
		}

	});

	$("#getCreateContactForm").live("click",function(e) {
		e.preventDefault();
		$(this).fadeOut(250, function() {
			getInlineContactForm();
		});
	});

	$("#createContact").live("click",function(e) {
		e.preventDefault();
		var roles = new Array();
		$(".check_roles:checked").each(function() {
			roles.push($(this).val());
		});
		createOrganizationContact({"organizationID":$("#sourceOrganizationID").val(),"name":$("#contactName").val(),"emailAddress":$("#emailAddress").val(),"contactRoles":roles});
		//create the contact and update the contact list
	});

	$("#addEmail").live("click", function(e) {
		e.preventDefault();
		$("#currentEmails").append($("#inputEmail").val()+", ");
		currentVal = $("#ccEmails").val();
		if (!currentVal) {
			$("#ccEmails").val($("#inputEmail").val());
		} else {
			$("#ccEmails").val(currentVal+','+$("#inputEmail").val());
		}
		$("#inputEmail").val('');
	});

 });
 
 
var showArchivedContacts = 0;

function updateOrganization(){
  $("#div_organizationDetails").append("<img src='images/circle.gif'>  Refreshing Contents...");
  $.ajax({
	 type:       "GET",
	 url:        "ajax_htmldata.php",
	 cache:      false,
	 data:       "action=getOrganizationDetails&organizationID=" + $("#organizationID").val(),
	 success:    function(html) {
	 	updateOrganizationName();
		$("#div_organizationDetails").html(html);
		tb_reinit();
	 }


  });

}
 
function updateOrganizationName(){
  $.ajax({
	 type:       "GET",
	 url:        "ajax_htmldata.php",
	 cache:      false,
	 data:       "action=getOrganizationName&organizationID=" + $("#organizationID").val(),
	 success:    function(html) {
		$("#span_orgName").html(html);
	 }


  });

}
 
 
function updateAliases(){
  $("#div_aliasDetails").append("<img src='images/circle.gif'>  Refreshing Contents...");
  $.ajax({
	 type:       "GET",
	 url:        "ajax_htmldata.php",
	 cache:      false,
	 data:       "action=getAliasDetails&organizationID=" + $("#organizationID").val(),
	 success:    function(html) {
		$("#div_aliasDetails").html(html);
		tb_reinit();
	 }


  });

}

 
 
function updateContacts(){
  $("#div_contactDetails").append("<img src='images/circle.gif'>  Refreshing Contents...");
  $.ajax({
	 type:       "GET",
	 url:        "ajax_htmldata.php",
	 cache:      false,
	 data:       "action=getContactDetails&organizationID=" + $("#organizationID").val() + "&archiveInd=0",
	 success:    function(html) {
		$("#div_contactDetails").html(html);
		tb_reinit();
	 }


  });

}


 
function updateArchivedContacts(showArchivedPassed){
  if (typeof(showArchivedPassed) != 'undefined'){
	showArchivedContacts = showArchivedPassed;
  }

  
  $("#div_archivedContactDetails").append("<img src='images/circle.gif'>  Refreshing Contents...");
  $.ajax({
	 type:       "GET",
	 url:        "ajax_htmldata.php",
	 cache:      false,
	 data:       "action=getContactDetails&organizationID=" + $("#organizationID").val() + "&archiveInd=1&showArchivesInd=" + showArchivedContacts,
	 success:    function(html) {
		$("#div_archivedContactDetails").html(html);
		tb_reinit();
	 }


  });

}
 
 
function updateAccount(){
  $("#div_accountDetails").append("<img src='images/circle.gif'>  Refreshing Contents...");
  $.ajax({
	 type:       "GET",
	 url:        "ajax_htmldata.php",
	 cache:      false,
	 data:       "action=getAccountDetails&organizationID=" + $("#organizationID").val(),
	 success:    function(html) {
		$("#div_accountDetails").html(html);
		tb_reinit();
	 }


  });

}

function createOrganizationContact(contact) {
	contact.contactRoles = contact.contactRoles.join();
	$.ajax({
		type:       "POST",
		url:        "ajax_processing.php?action=submitContact",
		cache:      false,
		data:       contact,
		success:    function(res) {

			var data = {};
			data.contactIDs = [];

			$("#contactIDs option:selected").each(function() {
				data.contactIDs.push($(this).val());
			});

			data.action = "getOrganizationContacts";
			data.organizationID = contact.organizationID;
			data.contactIDs.push(res);

			$.ajax({
				type:       "GET",
				url:        "ajax_htmldata.php",
				cache:      false,
				data:       $.param(data),
				success:    function(html) {
					$("#inlineContact").html(html).slideUp(250, function() {
						$("#getCreateContactForm").fadeIn(250);
					});
					$("#contactIDs").html(html);
				}
			});
		}
	});
}

function getInlineContactForm() {
	
	$.ajax({
		 type:       "GET",
		 url:        "ajax_forms.php",
		 cache:      false,
		 data:       "action=getInlineContactForm",
		 success:    function(html) {
			$("#inlineContact").html(html).slideDown(250);
		 }
	  });
}

function submitNewResourceIssue() {
	$.ajax({
		type:       "POST",
		url:        "ajax_processing.php?action=insertResourceIssue",
		cache:      false,
		data:       $("#newIssueForm").serialize(),
		success:    function(res) {
			console.log(res);
			updateIssues();
			tb_remove()
		}
	});
}

function updateResourceIssues(){
  $("#div_resourceissueDetails").append("<img src='images/circle.gif'>  Refreshing Contents...");
 $.ajax({
	 type:       "GET",
	 url:        "ajax_htmldata.php",
	 cache:      false,
	 data:       "action=getResourceIssueDetails&organizationID=" + $("#organizationID").val(),
	 success:    function(html) {
		$("#div_resourceissueDetails").html(html);
		tb_reinit();
	 }


  });
}

function submitCloseResourceIssue() {
	$('#submitCloseIssue').attr("disabled", "disabled"); 
	$.ajax({
		type:       "POST",
		url:        "ajax_processing.php?action=submitCloseResourceIssue",
		cache:      false,
		data:       { "issueID": $("#issueID").val(), "resolutionText":$("#resolutionText").val() },
		success:    function(html) {
			if (html.length > 1) {
				$("#submitCloseIssue").removeAttr("disabled");
			} else {
				tb_remove();
				updateIssues();
				return false;
			}			
		}
	});
}

function getResourceIssues(element) {
	var data = element.attr("href");
	$.ajax({
		url:        "ajax_htmldata.php",
		data: 		data,
		cache:      false,
		success:    function(html) {
			element.siblings(".issueList").html(html).slideToggle(250);
			tb_reinit();
		}
	});
	
}
 
function updateIssues(){
  $("#div_issueDetails").append("<img src='images/circle.gif'>  Refreshing Contents...");
  $.ajax({
	 type:       "GET",
	 url:        "ajax_htmldata.php",
	 cache:      false,
	 data:       "action=getIssueDetails&organizationID=" + $("#organizationID").val(),
	 success:    function(html) {
		$("#div_issueDetails").html(html);
		tb_reinit();
	 }


  });

}

 
function updateLicenses(){
  $("#div_licenseDetails").append("<img src='images/circle.gif'>  Refreshing Contents...");
  $.ajax({
	 type:       "GET",
	 url:        "ajax_htmldata.php",
	 cache:      false,
	 data:       "action=getLicenseDetails&organizationID=" + $("#organizationID").val(),
	 success:    function(html) {
		$("#div_licenseDetails").html(html);
		tb_reinit();
	 }


  });

}

   function removeOrganization(){

	if (($("#numLicenses").val() == 0) || ($("#numLicenses").val() == "")){

	  if (confirm("Do you really want to delete this organization?") == true) {
		  $.ajax({
			 type:       "GET",
			 url:        "ajax_processing.php",
			 cache:      false,
			 data:       "action=deleteOrganization&organizationID=" + $("#organizationID").val(),
			 success:    function(html) { 
				 //post return message to index
				postwith('index.php',{message:html});
			 }



		 });
	  }			


	}else{
		alert ("This Organization cannot be deleted because it has at least one License Record associated.");
	}
   }
   
   
   
   
   function removeAlias(id){
	  if (confirm("Do you really want to delete this alias?") == true) {
		  $.ajax({
			 type:       "GET",
			 url:        "ajax_processing.php",
			 cache:      false,
			 data:       "action=deleteInstance&class=Alias&id=" + id,
			 success:    function(html) {
				updateAliases();
			 }


		 });
	  }

   }


   function removeContact(id){
	  if (confirm("Do you really want to delete this contact?") == true) {
		  $.ajax({
			 type:       "GET",
			 url:        "ajax_processing.php",
			 cache:      false,
			 data:       "action=deleteInstance&class=Contact&id=" + id,
			 success:    function(html) {
				updateContacts();
 				updateArchivedContacts();
			 }


		 });
	  }

   }

   function removeExternalLogin(id){
	  if (confirm("Do you really want to delete this account?") == true) {
		  $.ajax({
			 type:       "GET",
			 url:        "ajax_processing.php",
			 cache:      false,
			 data:       "action=deleteInstance&class=ExternalLogin&id=" + id,
			 success:    function(html) {
				updateAccount();
			 }


		 });
	  }

   }



   function removeIssueLog(id){
	  if (confirm("Do you really want to delete this issue?") == true) {
		  $.ajax({
			 type:       "GET",
			 url:        "ajax_processing.php",
			 cache:      false,
			 data:       "action=deleteInstance&class=IssueLog&id=" + id,
			 success:    function(html) {
				updateIssues();
			 }


		 });
	  }

   }