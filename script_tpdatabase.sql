USE [TPprojectDB]
GO
/****** Object:  Table [dbo].[TP_Documentation]    Script Date: 4/06/2021 12:08:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TP_Documentation](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[IdentificationTypeID] [int] NOT NULL,
	[IdentificationNumber] [bigint] NOT NULL,
	[CompanyName] [nvarchar](250) NULL,
	[FirstName] [nvarchar](250) NULL,
	[SecondName] [nvarchar](250) NULL,
	[FirstLastName] [nvarchar](250) NULL,
	[SecondLastName] [nvarchar](250) NULL,
	[Email] [nvarchar](150) NOT NULL,
	[CheckMessagesCell] [bit] NOT NULL,
	[CheckMessagesEmail] [bit] NOT NULL,
	[CreationDate] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TP_IdentificationType]    Script Date: 4/06/2021 12:08:53 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TP_IdentificationType](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[CreationDate] [datetime] NOT NULL,
 CONSTRAINT [PK_TP_IdentificationType] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[TP_IdentificationType] ON 

INSERT [dbo].[TP_IdentificationType] ([ID], [Name], [CreationDate]) VALUES (1, N'CEDULA', CAST(N'2021-06-02T00:00:00.000' AS DateTime))
INSERT [dbo].[TP_IdentificationType] ([ID], [Name], [CreationDate]) VALUES (2, N'NIT', CAST(N'2021-06-02T00:00:00.000' AS DateTime))
INSERT [dbo].[TP_IdentificationType] ([ID], [Name], [CreationDate]) VALUES (3, N'CEDULA EXTRANGERIA', CAST(N'2021-06-02T22:54:39.653' AS DateTime))
SET IDENTITY_INSERT [dbo].[TP_IdentificationType] OFF
GO
/****** Object:  Index [PK_TP_Documentation]    Script Date: 4/06/2021 12:08:53 a. m. ******/
ALTER TABLE [dbo].[TP_Documentation] ADD  CONSTRAINT [PK_TP_Documentation] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[TP_Documentation]  WITH CHECK ADD  CONSTRAINT [FK_TP_Documentation_TP_IdentificationType] FOREIGN KEY([IdentificationTypeID])
REFERENCES [dbo].[TP_IdentificationType] ([ID])
GO
ALTER TABLE [dbo].[TP_Documentation] CHECK CONSTRAINT [FK_TP_Documentation_TP_IdentificationType]
GO
